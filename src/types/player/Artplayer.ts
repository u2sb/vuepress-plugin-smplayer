import Artplayer from "artplayer";
type ArtplayerOption = typeof Artplayer.option;
type CustomType = typeof Artplayer.option.customType;

export interface PlayerOptions
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
        [key: string]: CustomType;
      }
    | any;
  customInit?: (player: any, src: PlayerOptions) => Promise<Player>;
}

export default class Player extends Artplayer {
  constructor(options: PlayerOptions) {
    super(options as ArtplayerOption);
  }
}

export type { Player as Artplayer, PlayerOptions as ArtplayerOptions };
