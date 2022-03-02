import { Artplayer, Option as ArtplayerOption } from "./ArtplayerType";

export interface SbArtplayerOptions
  extends Omit<ArtplayerOption, "container" | "url"> {
  container?: HTMLElement | null;
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
  on?: Record<string, () => void>;
  once?: Record<string, () => void>;
  customFun?: Record<
    string,
    (player: SbArtplayer, src: SbArtplayerOptions) => void
  >;
  customInit?: (player: any, src: SbArtplayerOptions) => Promise<SbArtplayer>;
}

class SbArtplayer extends Artplayer {
  constructor(options: SbArtplayerOptions) {
    super(options as ArtplayerOption);
  }
}

export { SbArtplayer as Artplayer, SbArtplayerOptions as ArtplayerOptions };
