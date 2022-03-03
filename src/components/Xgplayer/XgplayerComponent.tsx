import merge from "deepmerge";
import Xgplayer from "./Xgplayer";
import { Xgplayer as XgplayerType } from "../../type/Config";
import { Xgplayer as XGplayer, IPlayerOptions } from "../../type/Xgplayer";
import {
  BasePlayerComponent,
  Component,
  Prop,
} from "../BasePlayer/SbBasePlayerComponent";

declare const XGPLAYER: XgplayerType;

@Component
export default class XgplayerComponent extends BasePlayerComponent<
  XGplayer,
  IPlayerOptions
> {
  @Prop({ type: String, default: XGPLAYER.width })
  declare width: string;

  @Prop({ type: Array, default: () => XGPLAYER.height })
  declare height: Array<number>;

  async mounted() {
    if (XGPLAYER.eventOn) {
      this.eventOn = this.eventOn
        ? merge(XGPLAYER.eventOn, this.eventOn)
        : XGPLAYER.eventOn;
    }
    if (XGPLAYER.customFun) {
      this.customFun = this.customFun
        ? merge(XGPLAYER.customFun, this.customFun)
        : XGPLAYER.customFun;
    }
    let src = {
      ...merge(XGPLAYER.src, this.src),
      el: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Xgplayer(src);
    await this.player.InitPlayer();
    this.player.AddCustomFun(this.customFun);
    this.player.AddOnEvent(this.eventOn);
  }

  beforeDestroy() {
    this.player?.DestroyPlayer();
  }
}
