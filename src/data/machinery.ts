import { imageRegistry, isPlaceholderVideo } from "@/data/images";

export const machineryCardKeys = [
  "ciLine",
  "dieCasting",
  "machining",
  "inspection",
] as const;

export type MachineryCardKey = (typeof machineryCardKeys)[number];

export type MachineryMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string }
  | { type: "gif"; src: string };

function resolveMachineryMedia(key: MachineryCardKey): MachineryMedia {
  const videoSrc = imageRegistry.machineryVideo[key];
  const posterSrc = imageRegistry.machineryPoster[key];

  if (!isPlaceholderVideo(videoSrc)) {
    return { type: "video", src: videoSrc, poster: posterSrc };
  }

  return { type: "image", src: imageRegistry.machinery[key] };
}

export const machineryCards: ReadonlyArray<{
  key: MachineryCardKey;
  media: MachineryMedia;
  wider: boolean;
}> = [
  {
    key: "ciLine",
    media: resolveMachineryMedia("ciLine"),
    wider: true,
  },
  {
    key: "dieCasting",
    media: resolveMachineryMedia("dieCasting"),
    wider: false,
  },
  {
    key: "machining",
    media: resolveMachineryMedia("machining"),
    wider: false,
  },
  {
    key: "inspection",
    media: resolveMachineryMedia("inspection"),
    wider: true,
  },
];
