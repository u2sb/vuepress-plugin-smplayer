import merge from "deepmerge";
import Xgplayer from "./Xgplayer";
import { Xgplayer as XgplayerType } from "../../type/Config";
import { Xgplayer as XGplayer, IPlayerOptions } from "../../type/Xgplayer";
import {
  BasePlayerComponent,
  Component,
} from "../BasePlayer/SbBasePlayerComponent";

declare const XGPLAYER: XgplayerType;

@Component
export default class XgplayerComponent extends BasePlayerComponent<
  XGplayer,
  IPlayerOptions
> {
  mounted() {
    let src = {
      ...merge(XGPLAYER.src, this.src),
      el: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Xgplayer(src);
  }

  beforeDestroy() {
    this.player?.DestroyPlayer();
  }
}
