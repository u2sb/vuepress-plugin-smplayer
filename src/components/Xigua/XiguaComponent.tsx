import { Xigua as XiguaType } from "../../type/Config";
import {
  VNode,
  Vue,
  Component,
  Prop,
  Ref,
} from "../BasePlayer/SbBasePlayerComponent";
import "./XiguaStyle.css";

declare const XIGUA: XiguaType;

@Component
export default class XiguaComponent extends Vue {
  @Prop({ required: true }) xid!: string;
  @Prop(String) id: string | undefined;
  @Prop({ default: XIGUA.autoplay }) autoplay!: boolean;
  @Prop({ default: XIGUA.startTime }) startTime!: number;
  @Prop({ default: XIGUA.allowfullscreen }) allowfullscreen!: string;
  @Prop({ default: XIGUA.sandbox }) sandbox!: string;
  @Ref("sbplayer") sbplayer!: HTMLElement | any;

  mounted() {
    this.sbplayer.style.height = (this.sbplayer.scrollWidth * 9) / 16 + "px";
  }

  render(): VNode {
    return (
      <div class="smplayer">
        <iframe
          ref="sbplayer"
          class="xiguaplayer"
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
