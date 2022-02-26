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
}

class SbArtplayer extends Artplayer {
  constructor(options: SbArtplayerOptions) {
    super(options as ArtplayerOption);
  }
}

export { SbArtplayer as Artplayer, SbArtplayerOptions as ArtplayerOptions };
