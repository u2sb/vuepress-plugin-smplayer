import { Xigua as XiguaType } from "../../type/Config";
import {
  VNode,
  Component,
  Prop,
  Vue,
  Ref,
} from "../BasePlayer/SbBasePlayerComponent";

declare const XIGUA: XiguaType;

@Component
export default class XiguaComponent extends Vue {
  @Prop({ required: true }) xid!: string;
  @Prop(String) id: string | undefined;
  @Prop({ default: XIGUA.autoplay }) autoplay!: boolean;
  @Prop({ default: XIGUA.startTime }) startTime!: number;
  @Prop({ default: XIGUA.allowfullscreen }) allowfullscreen!: string;
  @Prop({ default: XIGUA.sandbox }) sandbox!: string;
  @Prop({ type: String, default: XIGUA.width }) width!: string;
  @Prop({ type: Array, default: () => XIGUA.height }) height!: Array<number>;
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
          src={`//www.ixigua.com/iframe/${this.xid}?${
            this.id ? "id=" + this.id + "&" : ""
          }autoplay=${this.autoplay ? 1 : 0}&startTime=${this.startTime}`}
          allowfullscreen={this.allowfullscreen}
          scrolling="no"
          frameborder="0"
          sandbox={this.sandbox}
        ></iframe>
      </div>
    );
  }
}
