import merge from "deepmerge";
import Dplayer from "./Dplayer";
import { Dplayer as DplayerType } from "../../type/Config";
import { DPlayer as Player, DPlayerOptions } from "../../type/Dplayer";
import {
  BasePlayerComponent,
  Component,
} from "../BasePlayer/SbBasePlayerComponent";

declare const DPLAYER: DplayerType;

@Component
export default class DplayerComponent extends BasePlayerComponent<
  Player,
  DPlayerOptions
> {
  mounted() {
    let src = {
      ...merge(DPLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Dplayer(src);
  }

  beforeDestroy() {
    this.player?.DestroyPlayer();
  }
}
