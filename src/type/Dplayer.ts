import DPlayer, { DPlayerOptions, DPlayerEvents, DPlayerVideo } from "dplayer";

export interface SbDPlayerOptions extends Omit<DPlayerOptions, "container"> {
  container?: HTMLElement | null;
  customInit?: (player: any, src: SbDPlayerOptions) => Promise<SbDPlayer>;
}

class SbDPlayer extends DPlayer {
  constructor(options: SbDPlayerOptions) {
    super(options as DPlayerOptions);
  }
}

export {
  SbDPlayer as DPlayer,
  SbDPlayerOptions as DPlayerOptions,
  DPlayerEvents,
  DPlayerVideo,
};
