import merge from "deepmerge";
import Artplayer from "./Artplayer";
import { Artplayer as Player, ArtplayerOptions } from "../../types/Artplayer";
import { Artplayer as ArtplayerType } from "../../types/config";
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
    let on = merge(ARTPLAYER.on!, this.on);

    let src: ArtplayerOptions = {
      ...merge(ARTPLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Artplayer(src);
    await this.player.InitPlayer();
    this.player.AddOnEvent(on);
    this.sbplayer.style.height =
      this.sbplayer.scrollWidth * this.height[0] + this.height[1] + "px";
  }

  beforeDestroy(): void {
    this.player?.DestroyPlayer();
  }
}
