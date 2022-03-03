import merge from "deepmerge";
import Aplayer from "./Aplayer";
import { Aplayer as AplayerType } from "../../type/Config";
import { AplayerOptions } from "../../type/Aplayer";
import {
  BasePlayerComponent,
  Component,
  Prop,
} from "../BasePlayer/SbBasePlayerComponent";

declare const APLAYER: AplayerType;

@Component
export default class AplayerComponent extends BasePlayerComponent<
  any,
  AplayerOptions
> {
  async mounted(): Promise<void> {
    if (APLAYER.eventOn) {
      this.eventOn = this.eventOn
        ? merge(APLAYER.eventOn, this.eventOn)
        : APLAYER.eventOn;
    }
    if (APLAYER.customFun) {
      this.customFun = this.customFun
        ? merge(APLAYER.customFun, this.customFun)
        : APLAYER.customFun;
    }

    let src: AplayerOptions = {
      ...merge(APLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Aplayer(src);
    await this.player.InitPlayer();
    this.player.AddCustomFun(this.customFun);
    this.player.AddOnEvent(this.eventOn);
    this.$nextTick(() => {
      if (this.src.fixed) {
        const app = document.querySelector("#app");
        app?.append(this.$el);
      }
    });
  }
}
