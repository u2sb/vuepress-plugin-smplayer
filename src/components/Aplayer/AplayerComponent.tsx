import merge from "deepmerge";
import Aplayer from "./Aplayer";
import { Aplayer as AplayerType } from "../../types/config";
import { AplayerOptions, APlayer } from "../../types/Aplayer";
import {
  BasePlayerComponent,
  Component,
  Prop,
} from "../BasePlayer/SbBasePlayerComponent";

declare const APLAYER: AplayerType;

@Component
export default class AplayerComponent extends BasePlayerComponent<
  APlayer,
  AplayerOptions
> {
  async mounted(): Promise<void> {
    let on = merge(APLAYER.on!, this.on);

    let src: AplayerOptions = {
      ...merge(APLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Aplayer(src);
    await this.player.InitPlayer();
    this.player.AddOnEvent(on);
    this.$nextTick(() => {
      if (this.src.fixed) {
        const app = document.querySelector("#app");
        app?.append(this.$el);
      }
    });
  }
}
