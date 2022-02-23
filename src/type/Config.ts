import { DPlayerOptions } from "./dplayer";
import { Option as ArtplayerOptions } from "./artplayer";
import { IPlayerOptions } from "./xgplayer";

interface Aplayer {
  src: Record<string, any>;
}

interface AplayerAudio {
  name?: string;
  artist?: string;
  url?: string;
  cover?: string;
  lrc?: string;
  theme?: string;
  type?: string;
  customAudioType?: Record<string, Function>;
}

interface Meting {
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
  audio?: Array<AplayerAudio>;
  list?: Array<Meting>;
}

interface Dplayer {
  src: DPlayerOptions;
}

interface Artplayer {
  src: ArtplayerOptions;
}

interface Bilibili {
  bvid?: string;
  page?: number;
  danmaku?: boolean;
  allowfullscreen?: string;
  sandbox?: string;
}

interface Xigua {
  autoplay?: boolean;
  startTime?: number;
  allowfullscreen?: string;
  sandbox?: string;
}

interface Xgplayer {
  src: IPlayerOptions;
}

interface Config {
  aplayer?: Aplayer;
  meting?: Meting;
  dplayer?: Dplayer;
  artplayer?: Artplayer;
  bilibili?: Bilibili;
  xigua?: Xigua;
  xgplayer?: Xgplayer;
}

export {
  Aplayer,
  AplayerAudio,
  Meting,
  Dplayer,
  Artplayer,
  Bilibili,
  Xigua,
  Xgplayer,
  Config,
};