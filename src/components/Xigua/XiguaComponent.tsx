import { XiguaConfig } from "../../types";
import Vue, { VNode, PropType } from "vue";

declare const XIGUA: XiguaConfig;

export default Vue.extend({
  props: {
    xid: {
      type: String,
      default: null,
      required: true,
    },
    id: {
      type: String,
      default: null,
      required: false,
    },
    autoplay: {
      type: Boolean,
      default: XIGUA.autoplay,
      required: false,
    },
    startTime: {
      type: Number,
      default: XIGUA.startTime,
      required: false,
    },
    sandbox: {
      type: String,
      default: XIGUA.sandbox,
      required: false,
    },
    allowfullscreen: {
      type: [String, Boolean],
      default: XIGUA.allowfullscreen,
      required: false,
    },
    width: {
      type: String,
      default: XIGUA.width,
      required: false,
    },
    height: {
      type: Array as PropType<Array<number>>,
      default: () => XIGUA.height,
      required: false,
    },
  },
  render(): VNode {
    return (
      <div class="smplayer">
        <iframe
          ref="sbplayer"
          style={`width: ${this.width}`}
          src={`//www.ixigua.com/iframe/${this.xid}?${
            this.id ? "id=" + this.id + "&" : ""
          }autoplay=${this.autoplay ? 1 : 0}&startTime=${this.startTime}`}
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
