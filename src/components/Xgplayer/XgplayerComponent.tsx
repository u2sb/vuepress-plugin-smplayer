import merge from "deepmerge";
import Xgplayer from "./Xgplayer";
import { Xgplayer as XgplayerType } from "../../type/Config";
import { IPlayerOptions } from "../../type/Xgplayer";
import {
  BasePlayerComponent,
  Component,
} from "../BasePlayer/SbBasePlayerComponent";

declare const XGPLAYER: XgplayerType;

@Component
export default class XgplayerComponent extends BasePlayerComponent<IPlayerOptions> {
  xgplayer = new Xgplayer();
  mounted() {
    let src = merge(XGPLAYER.src, this.src);
    this.xgplayer.InitPlayer(src, this.sbplayer);
  }

  beforeDestroy() {
    this.xgplayer.DestroyPlayer();
  }
}
