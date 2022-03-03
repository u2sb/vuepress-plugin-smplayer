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
    let on = merge(DPLAYER.on!, this.on);

    let src = {
      ...merge(DPLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Dplayer(src);
    await this.player.InitPlayer();
    this.player.AddOnEvent(on);
  }

  beforeDestroy() {
    this.player?.DestroyPlayer();
  }
}
