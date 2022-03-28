import type {
  AplayerOptionsAudio,
  APlayerOptions,
  ArtplayerOptions,
  Artplayer,
  DPlayerOptions,
  DPlayer,
  IPlayerOptions,
  Xgplayer,
} from "./";

interface Player<T, U> {
  src: T;
  width?: string;
  on?: Record<string, (player: U, src: T) => void>;
  height?: Array<number>;
  customFun?: Array<(player: U, src: T) => void>;
}

interface APlayerConfig extends Player<APlayerOptions, any> {}
interface DPlayerConfig extends Player<DPlayerOptions, DPlayer> {}
interface ArtplayerConfig extends Player<ArtplayerOptions, Artplayer> {}
interface XgplayerConfig extends Player<IPlayerOptions, Xgplayer> {}

interface MetingConfig {
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
  audio?: Array<AplayerOptionsAudio>;
  list?: Array<MetingConfig>;
}

interface BilibiliConfig {
  bvid?: string;
  page?: number;
  danmaku?: boolean;
  allowfullscreen?: string | boolean;
  sandbox?: string;
  width?: string;
  height?: Array<number>;
}

interface XiguaConfig {
  xid?: string;
  id?: string;
  autoplay?: boolean;
  startTime?: number;
  allowfullscreen?: string | boolean;
  sandbox?: string;
  width?: string;
  height?: Array<number>;
}

interface Config {
  aplayer?: APlayerConfig;
  meting?: MetingConfig;
  dplayer?: DPlayerConfig;
  artplayer?: ArtplayerConfig;
  bilibili?: BilibiliConfig;
  xigua?: XiguaConfig;
  xgplayer?: XgplayerConfig;
}

export default Config;
export {
  APlayerConfig,
  ArtplayerConfig,
  DPlayerConfig,
  MetingConfig,
  XgplayerConfig,
  BilibiliConfig,
  XiguaConfig,
  Config,
};
