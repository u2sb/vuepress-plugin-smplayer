import Artplayer from "artplayer";
type ArtplayerOption = typeof Artplayer.option;

export interface PlayerOptions
  extends Omit<ArtplayerOption, "container" | "url"> {
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
  customInit?: (player: any, src: PlayerOptions) => Promise<Player>;
}

export default class Player extends Artplayer {
  constructor(options: PlayerOptions) {
    super(options as ArtplayerOption);
  }
}

export type { Player as Artplayer, PlayerOptions as ArtplayerOptions };
