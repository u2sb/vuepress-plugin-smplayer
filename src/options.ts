import type artplayer from "artplayer";
import type { AudioPlayerOption } from "vue3-audio-player";

export type ArtPlayer = artplayer;
export type ArtplayerOption = typeof artplayer.option;

type ArtPlayerCustomType = typeof artplayer.option.customType;

export interface BilibiliOptions {
  bvid?: string;
  page?: number;
  danmaku?: boolean;
  t?: number;
  width?: string | number;
  height?: string | number;
  ratio?: number;
}

export interface XiguaOptions {
  autoplay?: boolean;
  startTime?: number;
  width?: string | number;
  height?: string | number;
  ratio?: number;
}

export interface SbArtPlayerPlayerOptions
  extends Omit<ArtplayerOption, "container" | "url" | "customType"> {
  container?: HTMLElement | string;
  url?: string;
  quality?: {
    /**
     * Whether the default is selected
     */
    default?: boolean;

    /**
     * Html string of quality
     */
    html: string;

    /**
     * Video quality url
     */
    url: string;
    type?: string;
  }[];
  customType?:
    | {
        [key: string]: ArtPlayerCustomType;
      }
    | any;
}

export interface SbArtPlayerOptions {
  src?: SbArtPlayerPlayerOptions;
  width?: string;
  height?: string | number;
  ratio?: number;
}

export interface Vue3AudioPlayerOptions {
  src?: AudioPlayerOption;
}

export interface SmplayerPluginsOptions {
  bilibili?: BilibiliOptions;
  xigua?: XiguaOptions;
  artplayer?: SbArtPlayerOptions;
  vue3AudioPlayer?: Vue3AudioPlayerOptions;
}
