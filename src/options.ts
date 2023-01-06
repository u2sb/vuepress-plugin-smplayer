import type artplayer from "artplayer";

export type ArtPlayer = artplayer;
export type ArtplayerOption = typeof artplayer.option;
type ArtPlayerCustomType = typeof artplayer.option.customType;

export interface MetingOptions {
  id?: string;
  auth?: string;
  auto?: string;
  api?: string;
  server?: string;
  type?: string;
  fixed?: boolean;
  mini?: boolean;
  autoplay?: boolean;
  theme?: string;
  loop?: string;
  order?: string;
  preload?: string;
  volume?: number;
  mutex?: boolean;
  lrcType?: number;
  listFolded?: boolean;
  listMaxHeight?: string;
  storageName?: string;
  audio?: Array<Object>;
  list?: Array<MetingOptions>;
}

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

export interface SmplayerPluginsOptions {
  bilibili?: BilibiliOptions;
  xigua?: XiguaOptions;
  aplayer?: {
    src?: Object;
  };
  meting?: MetingOptions;
  artplayer?: SbArtPlayerOptions;
}
