import merge from "deepmerge";
import Dplayer from "./Dplayer";
import { Dplayer as DplayerType } from "../../type/Config";
import { DPlayer as Player, DPlayerOptions } from "../../type/Dplayer";
import {
  BasePlayerComponent,
  Component,
  Prop,
} from "../BasePlayer/SbBasePlayerComponent";

declare const DPLAYER: DplayerType;

@Component
export default class DplayerComponent extends BasePlayerComponent<
  Player,
  DPlayerOptions
> {
  @Prop({ type: String, default: DPLAYER.width })
  declare width: string;

  async mounted() {
    if (DPLAYER.eventOn) {
      this.eventOn = this.eventOn
        ? merge(DPLAYER.eventOn, this.eventOn)
        : DPLAYER.eventOn;
    }
    if (DPLAYER.customFun) {
      this.customFun = this.customFun
        ? merge(DPLAYER.customFun, this.customFun)
        : DPLAYER.customFun;
    }

    let src = {
      ...merge(DPLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Dplayer(src);
    await this.player.InitPlayer();
    this.player.AddCustomFun(this.customFun);
    this.player.AddOnEvent(this.eventOn);
  }

  beforeDestroy() {
    this.player?.DestroyPlayer();
  }
}
