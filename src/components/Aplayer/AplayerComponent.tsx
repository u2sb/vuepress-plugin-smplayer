import merge from "deepmerge";
import Aplayer from "./Aplayer";
import { Aplayer as AplayerType } from "../../type/Config";
import { AplayerOptions } from "../../type/Aplayer";
import {
  BasePlayerComponent,
  Component,
} from "../BasePlayer/SbBasePlayerComponent";

declare const APLAYER: AplayerType;

@Component
export default class AplayerComponent extends BasePlayerComponent<
  any,
  AplayerOptions
> {
  mounted(): void {
    let src: AplayerOptions = {
      ...merge(APLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Aplayer(src);
    this.$nextTick(() => {
      if (this.src.fixed) {
        const app = document.querySelector("#app");
        app?.append(this.$el);
      }
    });
  }
}
