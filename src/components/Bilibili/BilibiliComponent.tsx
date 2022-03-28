import { Bilibili as BilibiliType } from "../../types/config";
import {
  Vue,
  VNode,
  Component,
  Prop,
  Ref,
} from "../BasePlayer/SbBasePlayerComponent";

declare const BILIBILI: BilibiliType;

@Component
export default class BilibiliComponent extends Vue {
  @Prop({ required: true }) bvid!: string;
  @Prop({ default: BILIBILI.danmaku }) danmaku!: boolean;
  @Prop({ default: BILIBILI.page }) page!: number;
  @Prop({ default: BILIBILI.allowfullscreen }) allowfullscreen!: string;
  @Prop({ default: BILIBILI.sandbox }) sandbox!: string;
  @Prop({ type: String, default: BILIBILI.width }) width!: string;
  @Prop({ type: Array, default: () => BILIBILI.height }) height!: Array<number>;
  @Ref("sbplayer") sbplayer!: HTMLElement | any;

  mounted() {
    this.sbplayer.style.height =
      this.sbplayer.scrollWidth * this.height[0] + this.height[1] + "px";
  }

  render(): VNode {
    return (
      <div class="smplayer">
        <iframe
          ref="sbplayer"
          style={`width: ${this.width}`}
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
