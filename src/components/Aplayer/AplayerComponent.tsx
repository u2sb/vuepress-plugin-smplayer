import merge from "deepmerge";
import Aplayer from "./Aplayer";
import { Aplayer as AplayerType } from "../../type/Config";
import {
  BasePlayerComponent,
  Component,
} from "../BasePlayer/SbBasePlayerComponent";

declare const APLAYER: AplayerType;

@Component
export default class AplayerComponent extends BasePlayerComponent<
  Record<string, any>
> {
  aplayer = new Aplayer();
  mounted(): void {
    let src = merge(APLAYER.src, this.src);
    this.aplayer.InitPlayer(src, this.sbplayer);
    this.$nextTick(() => {
      if (this.src.fixed) {
        const app = document.querySelector("#app");
        app?.append(this.$el);
      }
    });
  }

  beforeDestroy(): void {
    this.aplayer.DestroyPlayer();
  }
}
