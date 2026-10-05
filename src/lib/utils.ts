import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Google Drive share/preview URLs for a public file id. */
export const drive = {
  preview: (id: string) => `https://drive.google.com/file/d/${id}/preview`,
  view: (id: string) => `https://drive.google.com/file/d/${id}/view`,
};

/** Split "121.3 req/s" → { prefix: "", num: 121.3, decimals: 1, suffix: " req/s" } for count-up. */
export function parseMetric(value: string) {
  const m = value.match(/^([^\d−-]*)([−-]?)([\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const [, prefix, sign, digits, suffix] = m;
  const clean = digits.replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  return {
    prefix: prefix + (sign ? "−" : ""),
    num: parseFloat(clean),
    decimals,
    grouped: digits.includes(","),
    suffix,
  };
}

export function formatNumber(n: number, decimals: number, grouped: boolean) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });
}
