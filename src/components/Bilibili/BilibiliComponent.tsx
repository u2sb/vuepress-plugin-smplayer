import { BilibiliConfig } from "../../types";
import Vue, { VNode, PropType } from "vue";

declare const BILIBILI: BilibiliConfig;

export default Vue.extend({
  props: {
    bvid: {
      type: String,
      default: BILIBILI.bvid,
      required: true,
    },
    danmaku: {
      type: Boolean,
      default: BILIBILI.danmaku,
      required: false,
    },
    page: {
      type: Number,
      default: BILIBILI.page,
      required: false,
    },
    sandbox: {
      type: String,
      default: BILIBILI.sandbox,
      required: false,
    },
    allowfullscreen: {
      type: [String, Boolean],
      default: BILIBILI.allowfullscreen,
      required: false,
    },
    width: {
      type: String,
      default: BILIBILI.width,
      required: false,
    },
    height: {
      type: Array as PropType<Array<number>>,
      default: () => BILIBILI.height,
      required: false,
    },
  },
  render(): VNode {
    return (
      <div class="smplayer">
        <iframe
          ref="sbplayer"
          style={`width: ${this.width}`}
          src={`//player.bilibili.com/player.html?bvid=${this.bvid}&page=${this.page}&danmaku=${this.danmaku}`}
          allowfullscreen={
            this.allowfullscreen === true || "true" || "allowfullscreen"
              ? true
              : false
          }
          scrolling="no"
          frameborder="0"
          sandbox={this.sandbox}
        ></iframe>
      </div>
    );
  },
  mounted() {
    this.$nextTick(() => {
      let sbplayer = this.$refs.sbplayer as HTMLIFrameElement;
      sbplayer.style.height = `${
        sbplayer.scrollWidth * this.height[0] + this.height[1]
      }px`;
    });
  },
});
