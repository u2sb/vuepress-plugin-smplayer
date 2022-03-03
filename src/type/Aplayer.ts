interface Audio {
  name: string;
  url: string;
  artist?: string;
  cover?: string;
  lrc?: string;
  theme?: string;
  type?: string;
  customAudioType?: Record<string, void>;
}

interface AplayerOptions {
  container?: HTMLElement;
  fixed?: boolean;
  mini?: boolean;
  autoplay?: boolean;
  theme?: string;
  loop?: "all" | "one" | "none";
  order?: "list" | "random";
  preload?: "none" | "metadata" | "auto";
  volume?: number;
  mutex?: boolean;
  listFolded?: boolean;
  listMaxHeight?: number;
  lrcType?: 0 | 1 | 2 | 3;
  audio?: Audio[];
  storageName?: string;
  customAudioType?: Record<string, void>;
  customInit?: (player: any, src: AplayerOptions) => Promise<any>;
}

export { Audio, AplayerOptions };
