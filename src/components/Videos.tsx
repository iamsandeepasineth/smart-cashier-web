import { DEMO_VIDEOS } from "../config/videos";
import { Eyebrow, H2, Reveal, section } from "./ui";

function youTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] || null;
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

export function Videos() {
  const videos = DEMO_VIDEOS.map((v) => ({ ...v, id: youTubeId(v.url) })).filter((v) => v.id);
  if (videos.length === 0) return null;

  return (
    <section id="videos" className={`${section} pt-24 sm:pt-32`}>
      <Reveal className="mb-10 text-center">
        <Eyebrow center>Videos</Eyebrow>
        <H2>See it in action.</H2>
      </Reveal>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
        {videos.map((v) => (
          <Reveal key={v.id}>
            <figure className="m-0 rounded-[22px] bg-soft p-3">
              <div className="relative aspect-video overflow-hidden rounded-[14px] bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <figcaption className="px-1.5 pb-1 pt-3 font-semibold">{v.title}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
