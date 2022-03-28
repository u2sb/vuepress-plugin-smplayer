import merge from "deepmerge";
import Xgplayer from "./Xgplayer";
import { Xgplayer as XgplayerType } from "../../types/config";
import { Xgplayer as XGplayer, IPlayerOptions } from "../../types/Xgplayer";
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
    let on = merge(XGPLAYER.on!, this.on);
    let src = {
      ...merge(XGPLAYER.src, this.src),
      el: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Xgplayer(src);
    await this.player.InitPlayer();
    this.player.AddOnEvent(on);
  }

  beforeDestroy() {
    this.player?.DestroyPlayer();
  }
}
