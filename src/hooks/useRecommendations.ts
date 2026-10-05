import { useEffect, useState } from "react";
import { defaultRecommendations, type Recommendation } from "@/data/recommendations";

/**
 * Defaults first, live overrides second.
 *
 * Renders the bundled defaults immediately, then fetches /data/recommendations.json.
 * Each field in that file overrides the default for the same `id` only if it is a
 * non-empty string; new ids are appended if they carry the required fields.
 * A missing file, a timeout, bad JSON or a bad field all fall back silently.
 */

const OVERRIDE_URL = "/data/recommendations.json";
const TIMEOUT_MS = 3500;
const FIELDS: (keyof Recommendation)[] = [
  "name", "designation", "company", "relationship", "profileUrl", "photo", "text", "highlight", "verifiedOn",
];

const isText = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const isSafeUrl = (v: string) => /^https:\/\//.test(v) || v.startsWith("/");

function sanitize(raw: Record<string, unknown>): Partial<Recommendation> {
  const out: Partial<Recommendation> = {};
  for (const key of FIELDS) {
    const v = raw[key];
    if (!isText(v)) continue;
    if ((key === "profileUrl" || key === "photo") && !isSafeUrl(v)) continue;
    (out as Record<string, string>)[key] = v.trim();
  }
  return out;
}

export function mergeRecommendations(defaults: Recommendation[], payload: unknown): Recommendation[] {
  const list = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object" && Array.isArray((payload as { recommendations?: unknown }).recommendations)
      ? (payload as { recommendations: unknown[] }).recommendations
      : null;
  if (!list) return defaults;

  const merged = defaults.map((d) => ({ ...d }));
  for (const item of list) {
    if (!item || typeof item !== "object" || !isText((item as { id?: unknown }).id)) continue;
    const id = (item as { id: string }).id;
    const patch = sanitize(item as Record<string, unknown>);
    const existing = merged.find((m) => m.id === id);
    if (existing) Object.assign(existing, patch);
    else if (patch.name && patch.text && patch.profileUrl) {
      merged.push({ id, relationship: "", verifiedOn: "", ...patch } as Recommendation);
    }
  }
  return merged;
}

export function useRecommendations() {
  const [items, setItems] = useState<Recommendation[]>(defaultRecommendations);
  const [source, setSource] = useState<"defaults" | "live">("defaults");

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), TIMEOUT_MS);

    fetch(OVERRIDE_URL, { signal: ctrl.signal, cache: "no-cache", headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json) => {
        setItems(mergeRecommendations(defaultRecommendations, json));
        setSource("live");
      })
      .catch(() => {
        /* keep defaults */
      })
      .finally(() => window.clearTimeout(timer));

    return () => {
      window.clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  return { items, source };
}
