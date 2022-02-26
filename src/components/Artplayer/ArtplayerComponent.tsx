import merge from "deepmerge";
import Artplayer from "./Artplayer";
import { ArtplayerOptions } from "../../type/Artplayer";
import { Artplayer as ArtplayerType } from "../../type/Config";
import {
  BasePlayerComponent,
  Component,
} from "../BasePlayer/SbBasePlayerComponent";

declare const ARTPLAYER: ArtplayerType;

@Component
export default class ArtplayerComponent extends BasePlayerComponent<ArtplayerOptions> {
  artplayer = new Artplayer();
  mounted(): void {
    let src = merge(ARTPLAYER.src, this.src);
    this.artplayer.InitPlayer(src, this.sbplayer);
    this.sbplayer.style.height =
      this.sbplayer.scrollWidth * this.height[0] + this.height[1] + "px";
  }

  beforeDestroy(): void {
    this.artplayer.DestroyPlayer();
  }
}
