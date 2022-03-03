import merge from "deepmerge";
import Artplayer from "./Artplayer";
import { Artplayer as Player, ArtplayerOptions } from "../../type/Artplayer";
import { Artplayer as ArtplayerType } from "../../type/Config";
import {
  BasePlayerComponent,
  Component,
  Prop,
} from "../BasePlayer/SbBasePlayerComponent";

declare const ARTPLAYER: ArtplayerType;

@Component
export default class ArtplayerComponent extends BasePlayerComponent<
  Player,
  ArtplayerOptions
> {
  @Prop({ type: String, default: ARTPLAYER.width })
  declare width: string;

  @Prop({ type: Array, default: () => ARTPLAYER.height })
  declare height: Array<number>;

  async mounted(): Promise<void> {
    if (ARTPLAYER.eventOn) {
      this.eventOn = this.eventOn
        ? merge(ARTPLAYER.eventOn, this.eventOn)
        : ARTPLAYER.eventOn;
    }
    if (ARTPLAYER.customFun) {
      this.customFun = this.customFun
        ? merge(ARTPLAYER.customFun, this.customFun)
        : ARTPLAYER.customFun;
    }
    let src: ArtplayerOptions = {
      ...merge(ARTPLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Artplayer(src);
    await this.player.InitPlayer();
    this.player.AddCustomFun(this.customFun);
    this.player.AddOnEvent(this.eventOn);
    this.sbplayer.style.height =
      this.sbplayer.scrollWidth * this.height[0] + this.height[1] + "px";
  }

  beforeDestroy(): void {
    this.player?.DestroyPlayer();
  }
}
