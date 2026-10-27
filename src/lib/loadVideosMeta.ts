import videosJson from '../../portfolio-videos/videos.json';

export type VideoMeta = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  videoMp4: string | null;
  videoWebm: string | null;
  poster: string;
  duration: string;
  repoUrl: string;
  is_real_run: boolean;
  notes: string;
};

const bySlug = new Map<string, VideoMeta>(
  (videosJson as VideoMeta[]).map((v) => [v.slug, v]),
);

export function videoMetaFor(slug: string): VideoMeta | undefined {
  return bySlug.get(slug);
}
