import { DPlayerOptions, DPlayer } from "./Dplayer";
import { ArtplayerOptions, Artplayer as ArtPlayer } from "./Artplayer";
import { IPlayerOptions, Xgplayer as XgPlayer } from "./Xgplayer";
import { Audio as AplayerAudio, AplayerOptions } from "./Aplayer";

interface Player<T, U> {
  src: T;
  width?: string;
  eventOn?: Record<string, (player: U, src: T) => void>;
  height?: Array<number>;
  customFun?: Array<(player: U, src: T) => void>;
}

interface Aplayer extends Player<AplayerOptions, any> {}
interface Dplayer extends Player<DPlayerOptions, DPlayer> {}
interface Artplayer extends Player<ArtplayerOptions, ArtPlayer> {}
interface Xgplayer extends Player<IPlayerOptions, XgPlayer> {}

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

interface Bilibili {
  bvid?: string;
  page?: number;
  danmaku?: boolean;
  allowfullscreen?: string;
  sandbox?: string;
  width?: string;
  height?: Array<number>;
}

interface Xigua {
  autoplay?: boolean;
  startTime?: number;
  allowfullscreen?: string;
  sandbox?: string;
  width?: string;
  height?: Array<number>;
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
