// Live domain registry data. Mirrors the lookups in github.com/abusayed0206/actions (scripts/whoisinfo.py):
// gTLDs via public RDAP, .bd via api.sayed.app/whoisbd, .de via DENIC RDAP + the Spaceship registrar API (DENIC publishes no expiry date).

export type DomainRole = "own" | "managed" | "past";

export interface DomainConfig {
  name: string;
  role: DomainRole;
  purpose: string;
  /** Shown when the lookup doesn't return a registrar. */
  registrar: string;
  /** Used when no public lookup returns an expiry date. */
  fixedExpiry?: string;
}

export const DOMAINS: DomainConfig[] = [
  { name: "sayed.app", role: "own", purpose: "This project hub and every *.sayed.app project", registrar: "Cloudflare" },
  { name: "sayed.dev", role: "own", purpose: "Main site: CV & research", registrar: "Cloudflare" },
  { name: "sayed.page", role: "own", purpose: "Intro card, email and Bluesky handle", registrar: "Cloudflare" },
  { name: "sayed.blog", role: "own", purpose: "Blog", registrar: "Cloudflare" },
  { name: "abusayed.dev", role: "own", purpose: "Old intro address, redirects to sayed.page", registrar: "Cloudflare" },
  // fixedExpiry is the fallback when Spaceship credentials are missing (date from the actions WHOIS run, 2026-11-01).
  { name: "abusayed.de", role: "own", purpose: "German alias of sayed.dev", registrar: "Spaceship", fixedExpiry: "2027-10-16T21:20:43Z" },
  { name: "kriti.app", role: "own", purpose: "Bangla font catalog & CDN", registrar: "Name.com" },
  { name: "tracker.bd", role: "own", purpose: "Bangladesh tracking platform", registrar: "BTCL" },
  { name: "lrs.bd", role: "own", purpose: "Alias of sayed.dev", registrar: "BTCL" },
  { name: "nayem.page", role: "managed", purpose: "My brother's website", registrar: "Cloudflare" },
  { name: "nextshop.com.bd", role: "past", purpose: "My old e-commerce startup, no longer running", registrar: "BTCL" },
];


export interface DomainRecord extends DomainConfig {
  registered?: string;
  expires?: string;
  expirySource: "live" | "fixed" | "unknown";
  statuses: string[];
  nameservers: string[];
  registrarLive?: string;
  online?: { ok: boolean; code?: number };
  error?: string;
  autoRenew?: boolean;
}

const UA = { "User-Agent": "sayed.app domain page (+https://sayed.app/domains)", Accept: "application/json" };
const REVALIDATE = 60 * 60 * 6;

type RdapEvent = { eventAction: string; eventDate: string };
type RdapEntity = { roles?: string[]; vcardArray?: [string, [string, unknown, string, string][]] };

async function rdap(name: string) {
  const res = await fetch(`https://rdap.org/domain/${name}`, { headers: UA, next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`RDAP ${res.status}`);
  const j = await res.json();
  const ev = (a: string) => (j.events as RdapEvent[] | undefined)?.find((e) => e.eventAction === a)?.eventDate;
  const registrar = (j.entities as RdapEntity[] | undefined)
    ?.find((e) => e.roles?.includes("registrar"))
    ?.vcardArray?.[1]?.find((v) => v[0] === "fn")?.[3];
  return {
    registered: ev("registration"),
    expires: ev("expiration"),
    statuses: (j.status as string[] | undefined) ?? [],
    nameservers: ((j.nameservers as { ldhName: string }[] | undefined) ?? []).map((n) => n.ldhName.toLowerCase()),
    registrarLive: registrar,
  };
}

// "20/01/2027" -> ISO date
const dmy = (s?: string) => {
  const m = s?.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : undefined;
};

async function bdWhois(name: string) {
  const res = await fetch(`https://api.sayed.app/whoisbd/lookup?domain=${name}`, { headers: UA, next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`WHOIS ${res.status}`);
  const j = await res.json();
  if (!j.success || !j.data) throw new Error("WHOIS lookup failed");
  // The .bd WHOIS also returns registrant name and email; deliberately not exposed.
  return {
    registered: dmy(j.data.activation),
    expires: dmy(j.data.expiry),
    statuses: j.registered ? ["registered"] : [],
    nameservers: [j.data.primary_dns, j.data.secondary_dns, j.data.tertiary_dns].filter(Boolean).map((n: string) => n.toLowerCase()),
  };
}

async function denic(name: string) {
  const res = await fetch(`https://rdap.denic.de/domain/${name}`, { headers: UA, next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`DENIC ${res.status}`);
  const j = await res.json();
  return {
    statuses: (j.status as string[] | undefined) ?? [],
    nameservers: ((j.nameservers as { ldhName: string }[] | undefined) ?? []).map((n) => n.ldhName.toLowerCase()),
  };
}

// DENIC hides .de expiry dates, so ask the registrar. Needs SPACESHIP_API_KEY / SPACESHIP_API_SECRET (domains:read),
// the same credentials the actions WHOIS workflow uses. Server-only: never import this file from a client component.
async function spaceship(name: string) {
  const key = process.env.SPACESHIP_API_KEY;
  const secret = process.env.SPACESHIP_API_SECRET;
  if (!key || !secret) return null;
  const res = await fetch(`https://spaceship.dev/api/v1/domains/${name}`, {
    headers: { ...UA, "X-API-Key": key, "X-API-Secret": secret },
    next: { revalidate: REVALIDATE },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Spaceship ${res.status}`);
  const j = await res.json();
  return {
    registered: j.registrationDate as string | undefined,
    expires: j.expirationDate as string | undefined,
    autoRenew: typeof j.autoRenew === "boolean" ? (j.autoRenew as boolean) : undefined,
  };
}

async function deDomain(name: string) {
  // DENIC supplies status and nameservers; Spaceship adds dates. Either may fail without losing the other.
  const [registry, registrar] = await Promise.allSettled([denic(name), spaceship(name)]);
  if (registry.status === "rejected" && registrar.status === "rejected") throw registry.reason;
  return {
    statuses: [] as string[],
    nameservers: [] as string[],
    ...(registry.status === "fulfilled" ? registry.value : {}),
    ...(registrar.status === "fulfilled" && registrar.value ? registrar.value : {}),
  };
}

async function ping(name: string) {
  try {
    const res = await fetch(`https://${name}/`, { method: "HEAD", redirect: "manual", next: { revalidate: 600 }, signal: AbortSignal.timeout(6_000) });
    return { ok: res.status < 500, code: res.status };
  } catch {
    return { ok: false };
  }
}

async function lookup(d: DomainConfig): Promise<DomainRecord> {
  const base: DomainRecord = { ...d, expirySource: "unknown", statuses: [], nameservers: [] };
  const [info, online] = await Promise.all([
    (d.name.endsWith(".bd") ? bdWhois(d.name) : d.name.endsWith(".de") ? deDomain(d.name) : rdap(d.name)).then(
      (v) => ({ v }),
      (e: Error) => ({ e }),
    ),
    ping(d.name),
  ]);
  const rec: DomainRecord = { ...base, online, ...("v" in info ? info.v : { error: info.e.message }) };
  if (rec.expires) rec.expirySource = "live";
  else if (d.fixedExpiry) Object.assign(rec, { expires: d.fixedExpiry, expirySource: "fixed" });
  return rec;
}

export async function getDomains() {
  const records = await Promise.all(DOMAINS.map(lookup));
  records.sort((a, b) => (a.expires ?? "9999").localeCompare(b.expires ?? "9999"));
  return { records, checkedAt: Date.now() };
}

export const daysUntil = (iso: string, now: number) => Math.ceil((Date.parse(iso) - now) / 86_400_000);
