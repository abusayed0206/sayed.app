/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { fetchAllVercelProjects } from "@/lib/vercel/fetchProjects";
import { fetchProjectDomains } from "@/lib/vercel/fetchDomains";

export async function updateProjects() {
  const cookieStore = cookies();
  const supabase = await createClient();

  const projects = await fetchAllVercelProjects();

  for (const proj of projects) {
    await supabase.from("projects").upsert({
      id: proj.id,
      name: proj.name,
      last_updated: new Date().toISOString(),
    });
  }
}

export async function updateDomains() {
  const supabase = await createClient();

  const { data: projects } = await supabase.from("projects").select("id");

  if (!projects) return;

  for (const { id } of projects) {
    const domains = await fetchProjectDomains(id);

    for (const domain of domains) {
      const isCustom = !domain.name.endsWith(".vercel.app");

      await supabase.from("domains").upsert(
        {
          domain: domain.name,
          is_custom: isCustom,
          project_id: id,
        },
        {
          onConflict: "domain",
        }
      );
    }
  }
}
