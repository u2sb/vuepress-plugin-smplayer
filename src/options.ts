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

export interface SmplayerPluginsOptions {
  bilibili?: BilibiliOptions;
  xigua?: XiguaOptions;
  aplayer?: {
    src?: Object;
  };
  meting?: MetingOptions;
}
