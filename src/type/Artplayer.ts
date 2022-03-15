import { Artplayer, Option as ArtplayerOption } from "./ArtplayerType";

export interface SbArtplayerOptions extends ArtplayerOption {
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
  customInit?: (player: any, src: SbArtplayerOptions) => Promise<SbArtplayer>;
}

class SbArtplayer extends Artplayer {
  constructor(options: SbArtplayerOptions) {
    super(options as ArtplayerOption);
  }
}

export { SbArtplayer as Artplayer, SbArtplayerOptions as ArtplayerOptions };
