import { Bilibili as BilibiliType } from "../../type/Config";
import {
  VNode,
  Vue,
  Component,
  Prop,
  Ref,
} from "../BasePlayer/SbBasePlayerComponent";
import "./BilibiliStyle.css";

declare const BILIBILI: BilibiliType;

@Component
export default class BilibiliComponent extends Vue {
  @Prop({ required: true }) bvid!: string;
  @Prop({ default: BILIBILI.danmaku }) danmaku!: boolean;
  @Prop({ default: BILIBILI.page }) page!: number;
  @Prop({ default: BILIBILI.allowfullscreen }) allowfullscreen!: string;
  @Prop({ default: BILIBILI.sandbox }) sandbox!: string;
  @Ref("sbplayer") sbplayer!: HTMLElement | any;

  mounted() {
    this.sbplayer.style.height =
      (this.sbplayer.scrollWidth * 9) / 16 + 50 + "px";
  }

  render(): VNode {
    return (
      <div class="smplayer">
        <iframe
          ref="sbplayer"
          class="bbplayer"
          src={`//player.bilibili.com/player.html?bvid=${this.bvid}&page=${this.page}&danmaku=${this.danmaku}`}
          allowfullscreen={this.allowfullscreen}
          scrolling="no"
          frameborder="0"
          sandbox={this.sandbox}
        ></iframe>
      </div>
    );
  }
}
