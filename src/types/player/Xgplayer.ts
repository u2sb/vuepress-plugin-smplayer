import Xgplayer, { IPlayerOptions } from "xgplayer";

export interface PlayerOptions extends Omit<IPlayerOptions, "url"> {
  url?: string | Array<{ src: string; type?: string }>;
  type?: string;
  customInit?: (player: any, src: PlayerOptions) => Promise<Player>;
}

class Player extends Xgplayer {
  constructor(options: PlayerOptions) {
    super(options as IPlayerOptions);
  }
}

export type { Player as Xgplayer, PlayerOptions as IPlayerOptions };
