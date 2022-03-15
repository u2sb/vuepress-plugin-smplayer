import Xgplayer, { IPlayerOptions } from "xgplayer";

export interface SbXgPlayerOptions extends IPlayerOptions {
  type?: string;
  customInit?: (player: any, src: SbXgPlayerOptions) => Promise<SbXgplayer>;
}

class SbXgplayer extends Xgplayer {
  constructor(options: SbXgPlayerOptions) {
    super(options as IPlayerOptions);
  }
}

export { SbXgplayer as Xgplayer, SbXgPlayerOptions as IPlayerOptions };
