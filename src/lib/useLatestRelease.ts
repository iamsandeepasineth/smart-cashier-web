import { useEffect, useState } from "react";
import { ENV } from "../config/env";

export interface ReleaseInfo {
  /** Where the download button points. */
  url: string;
  version: string | null;
  sizeMb: number | null;
  /** True once we have the direct .exe link from GitHub. */
  direct: boolean;
}

const CACHE_KEY = "minipos-latest-release";
const CACHE_MS = 30 * 60 * 1000;

const fallback: ReleaseInfo = {
  url:
    ENV.downloadUrl ||
    ENV.releasesPageUrl ||
    (ENV.githubRepo ? `https://github.com/${ENV.githubRepo}/releases/latest` : "#"),
  version: null,
  sizeMb: null,
  direct: false,
};

function readCache(): ReleaseInfo | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, info } = JSON.parse(raw);
    return Date.now() - at < CACHE_MS ? info : null;
  } catch {
    return null;
  }
}

function writeCache(info: ReleaseInfo) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), info }));
  } catch {
    /* storage blocked - fine */
  }
}

type GhRelease = {
  tag_name?: string;
  assets?: { name: string; size: number; browser_download_url: string }[];
};

/** Latest Windows installer from the public GitHub releases repo, with a safe fallback. */
export function useLatestRelease(): ReleaseInfo {
  const [info, setInfo] = useState<ReleaseInfo>(() => readCache() ?? fallback);

  useEffect(() => {
    if (!ENV.githubRepo || info.direct) return;
    const ctrl = new AbortController();
    fetch(`https://api.github.com/repos/${ENV.githubRepo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? (r.json() as Promise<GhRelease>) : Promise.reject(new Error(String(r.status)))))
      .then((rel) => {
        const exe = rel.assets?.find((a) => /\.exe$/i.test(a.name));
        if (!exe) return;
        const next: ReleaseInfo = {
          url: exe.browser_download_url,
          version: rel.tag_name ?? null,
          sizeMb: Math.round(exe.size / (1024 * 1024)),
          direct: true,
        };
        writeCache(next);
        setInfo(next);
      })
      .catch(() => {
        /* keep the fallback link */
      });
    return () => ctrl.abort();
  }, [info.direct]);

  return info;
}

export function releaseLine(info: ReleaseInfo) {
  return [info.version, "Windows installer (.exe)", info.sizeMb ? `${info.sizeMb} MB` : null]
    .filter(Boolean)
    .join(" · ");
}
