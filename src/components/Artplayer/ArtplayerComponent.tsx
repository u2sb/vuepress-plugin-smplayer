import merge from "deepmerge";
import Artplayer from "./Artplayer";
import { ArtplayerOptions } from "../../type/Artplayer";
import { Artplayer as ArtplayerType } from "../../type/Config";
import {
  BasePlayerComponent,
  Component,
} from "../BasePlayer/SbBasePlayerComponent";
import "./ArtplayerStyle.css";

declare const ARTPLAYER: ArtplayerType;

@Component
export default class ArtplayerComponent extends BasePlayerComponent<ArtplayerOptions> {
  artplayer = new Artplayer();
  mounted(): void {
    let src = merge(ARTPLAYER.src, this.src);
    this.artplayer.InitPlayer(src, this.sbplayer);
    this.artplayer.ChangeWidth(this.sbplayer);
  }

  beforeDestroy(): void {
    this.artplayer.DestroyPlayer();
  }
}
