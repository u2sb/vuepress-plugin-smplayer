import DPlayer, { DPlayerOptions, DPlayerEvents, DPlayerVideo } from "dplayer";

export interface PlayerOptions extends Omit<DPlayerOptions, "container"> {
  container?: HTMLElement | null;
  customInit?: (player: any, src: PlayerOptions) => Promise<Player>;
}

export default class Player extends DPlayer {
  constructor(options: PlayerOptions) {
    super(options as DPlayerOptions);
  }
}

export type {
  Player as DPlayer,
  PlayerOptions as DPlayerOptions,
  DPlayerEvents,
  DPlayerVideo as DPlayerOptionsVideo,
};
