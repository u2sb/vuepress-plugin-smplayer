import merge from "deepmerge";
import Dplayer from "./Dplayer";
import { Dplayer as DplayerType } from "../../type/Config";
import { DPlayerOptions } from "../../type/Dplayer";
import {
  BasePlayerComponent,
  Component,
} from "../BasePlayer/SbBasePlayerComponent";

declare const DPLAYER: DplayerType;

@Component
export default class DplayerComponent extends BasePlayerComponent<DPlayerOptions> {
  dplayer: Dplayer = new Dplayer();

  mounted() {
    let src = merge(DPLAYER.src, this.src);
    this.dplayer.InitPlayer(src, this.sbplayer);
  }

  beforeDestroy() {
    this.dplayer.DestroyPlayer();
  }
}
