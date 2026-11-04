import type { Metadata } from "next";
import { daysUntil, getDomains, type DomainRole } from "@/lib/domains";

export const metadata: Metadata = {
  title: "Domains",
  description: "Every domain Abu Sayed owns or manages, with live registration, expiry and uptime data.",
  alternates: { canonical: "/domains" },
};

// Registry lookups are cached 6 h and uptime pings 10 min (lib/domains.ts); the page regenerates on the shorter one.
export const revalidate = 21600;

const label = "font-mono text-[11px] uppercase tracking-wider text-muted-foreground";
const RUNWAY_DAYS = 365 * 3;

const fmt = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "n/a";

function urgency(days?: number) {
  if (days === undefined) return { color: "var(--mute)", text: "Unknown" };
  if (days <= 30) return { color: "var(--signal)", text: "Renew now" };
  if (days <= 90) return { color: "var(--cat-other)", text: "Renew soon" };
  return { color: "var(--accent)", text: "Healthy" };
}

const ROLE: Record<DomainRole, { label: string; mine: boolean }> = {
  own: { label: "Mine", mine: true },
  managed: { label: "Managed", mine: false },
  past: { label: "Past project", mine: false },
};

const age = (iso: string | undefined, now: number) => {
  if (!iso) return "n/a";
  const y = Math.floor((now - Date.parse(iso)) / (365.25 * 86_400_000));
  return y < 1 ? "< 1 year" : `${y} year${y > 1 ? "s" : ""}`;
};

export default async function DomainsPage() {
  const { records: domains, checkedAt: now } = await getDomains();
  const withDays = domains.map((d) => ({ ...d, days: d.expires ? daysUntil(d.expires, now) : undefined }));
  const next = withDays.find((d) => d.days !== undefined);
  const registrars = [...new Set(domains.map((d) => d.registrar))];
  const online = domains.filter((d) => d.online?.ok).length;
  const count = (r: DomainRole) => domains.filter((d) => d.role === r).length;
  const attention = withDays.filter((d) => d.days !== undefined && d.days <= 90).length;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <header className="pt-14 pb-10">
        <p className={label}>Infrastructure</p>
        <h1 className="mt-3 font-serif text-5xl sm:text-7xl text-headings leading-[0.95] tracking-tight text-balance">
          {domains.length} domains,{" "}
          {attention === 0 ? (
            <em className="text-primary">all comfortably renewed.</em>
          ) : (
            <em style={{ color: withDays.some((d) => d.days !== undefined && d.days <= 30) ? "var(--signal)" : "var(--cat-other)" }}>
              {attention} renewing soon.
            </em>
          )}
        </h1>
        <p className="mt-5 max-w-2xl text-lg">
          Every domain I own or look after, with registration data pulled live from the registries. These are the same checks my{" "}
          <a href="https://github.com/abusayed0206/actions" className="text-headings link-underline">WHOIS GitHub Action</a> sends me every week.
        </p>

        <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {[
            { k: "Domains", v: String(domains.length), s: `${count("own")} mine · ${count("managed")} managed · ${count("past")} past` },
            { k: "Next renewal", v: next ? `${next.days}d` : "n/a", s: next ? next.name : "" },
            { k: "Registrars", v: String(registrars.length), s: registrars.join(", ") },
            { k: "Online now", v: `${online}/${domains.length}`, s: "responding over HTTPS" },
          ].map((x) => (
            <div key={x.k} className="bg-card p-5">
              <dt className={label}>{x.k}</dt>
              <dd className="mt-2 font-serif text-4xl sm:text-5xl leading-none text-headings">{x.v}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">{x.s}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-labelledby="list">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4 border-b border-border pb-3">
          <h2 id="list" className={label}>Sorted by expiry</h2>
          <p className="font-mono text-[11px] text-muted-foreground">
            Checked {new Date(now).toISOString().slice(0, 16).replace("T", " ")} UTC · runway bar = 3 years
          </p>
        </div>
        <ul>
          {withDays.map((d) => {
            const u = urgency(d.days);
            const pct = d.days === undefined ? 0 : Math.max(2, Math.min(100, (d.days / RUNWAY_DAYS) * 100));
            return (
              <li key={d.name} className="grid gap-x-8 gap-y-4 py-6 border-b border-border lg:grid-cols-[1.3fr_1fr_1.2fr]">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: d.online?.ok ? "var(--accent)" : "var(--signal)" }}
                      title={d.online?.ok ? `Online (HTTP ${d.online.code})` : "Not responding"}
                      aria-label={d.online?.ok ? "Online" : "Offline"}
                    />
                    <a href={`https://${d.name}`} className="font-serif text-3xl sm:text-4xl text-headings hover:text-primary transition-colors truncate">
                      {d.name}
                    </a>
                  </div>
                  <p className="mt-1 text-sm">{d.purpose}</p>
                  <p className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                    <span className={`px-1.5 py-0.5 rounded border ${ROLE[d.role].mine ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                      {ROLE[d.role].label}
                    </span>
                    {d.statuses.slice(0, 2).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded border border-border text-muted-foreground">{s}</span>
                    ))}
                    {d.autoRenew && <span className="px-1.5 py-0.5 rounded border border-border text-muted-foreground">auto-renew</span>}
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm content-start">
                  <div>
                    <dt className={label}>Registrar</dt>
                    <dd className="text-headings">{d.registrar}</dd>
                  </div>
                  <div>
                    <dt className={label}>Age</dt>
                    <dd className="text-headings">{age(d.registered, now)}</dd>
                  </div>
                  <div>
                    <dt className={label}>Registered</dt>
                    <dd className="text-headings">{fmt(d.registered)}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className={label}>Nameservers</dt>
                    <dd className="font-mono text-xs truncate" title={d.nameservers.join(", ")}>
                      {d.nameservers.length ? d.nameservers.map((n) => n.split(".")[0]).join(" · ") : "n/a"}
                    </dd>
                  </div>
                </dl>

                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span>
                      <span className="block text-headings">{fmt(d.expires)}</span>
                      <span className={label}>
                        Expires{d.expirySource === "fixed" && " · last known"}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block font-serif text-4xl leading-none" style={{ color: u.color }}>
                        {d.days ?? "?"}
                        <span className="text-base text-muted-foreground"> days</span>
                      </span>
                      <span className="font-mono text-[11px]" style={{ color: u.color }}>{u.text}</span>
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-surface overflow-hidden" role="img" aria-label={`${d.days ?? "unknown"} days left`}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: u.color }} />
                  </div>
                  {d.error && <p className="mt-2 font-mono text-[11px] text-signal">Live lookup failed: {d.error}</p>}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground max-w-3xl leading-relaxed">
          Sources: public RDAP for .app, .dev, .page and .blog; the BTCL WHOIS via api.sayed.app for .bd. DENIC doesn&apos;t publish expiry
          dates for .de, so abusayed.de combines DENIC&apos;s status with dates from the Spaceship registrar API.
        </p>
      </section>
    </div>
  );
}
