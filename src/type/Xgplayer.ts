import Xgplayer, { IPlayerOptions } from "xgplayer";

export interface SbXgPlayerOptions extends Omit<IPlayerOptions, "url"> {
  url?: string | Array<{ src: string; type?: string }>;
  type?: string;
  on?: Record<string, () => void>;
  once?: Record<string, () => void>;
  customFun?: Record<
    string,
    (player: SbXgplayer, src: SbXgPlayerOptions) => void
  >;
  customInit?: (player: any, src: SbXgPlayerOptions) => Promise<SbXgplayer>;
}

class SbXgplayer extends Xgplayer {
  constructor(options: SbXgPlayerOptions) {
    super(options as IPlayerOptions);
  }
}

export { SbXgplayer as Xgplayer, SbXgPlayerOptions as IPlayerOptions };
