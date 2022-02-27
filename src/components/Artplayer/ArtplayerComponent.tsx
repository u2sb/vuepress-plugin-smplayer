import merge from "deepmerge";
import Artplayer from "./Artplayer";
import { Artplayer as Player, ArtplayerOptions } from "../../type/Artplayer";
import { Artplayer as ArtplayerType } from "../../type/Config";
import {
  BasePlayerComponent,
  Component,
} from "../BasePlayer/SbBasePlayerComponent";

declare const ARTPLAYER: ArtplayerType;

@Component
export default class ArtplayerComponent extends BasePlayerComponent<
  Player,
  ArtplayerOptions
> {
  mounted(): void {
    let src: ArtplayerOptions = {
      ...merge(ARTPLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Artplayer(src);
    this.sbplayer.style.height =
      this.sbplayer.scrollWidth * this.height[0] + this.height[1] + "px";
  }

  beforeDestroy(): void {
    this.player?.DestroyPlayer();
  }
}
