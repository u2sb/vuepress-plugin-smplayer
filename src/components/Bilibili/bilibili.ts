import { Bilibili as BilibiliType } from "../../type/Config";
import { Vue } from "vue-property-decorator";

declare const BILIBILI: BilibiliType;

export default Vue.extend({
  props: {
    bvid: {
      type: String,
      default: null,
      required: true,
    },
    page: {
      type: Number,
      default: BILIBILI.page,
      required: false,
    },
    danmaku: {
      type: Boolean,
      default: BILIBILI.danmaku,
      required: false,
    },
    sandbox: {
      type: String,
      default: BILIBILI.sandbox,
      required: false,
    },
    allowfullscreen: {
      type: String,
      default: BILIBILI.allowfullscreen,
      required: false,
    },
  },
  data() {
    return {
      src: `//player.bilibili.com/player.html?bvid=${this.bvid}&page=${this.page}&danmaku=${this.danmaku}`,
    };
  },
  mounted() {
    let mmplayer: HTMLElement = this.$refs.mmplayer as HTMLElement;
    mmplayer.style.height = (mmplayer.scrollWidth * 9) / 16 + 50 + "px";

    window.onresize = function () {
      mmplayer.style.height = (mmplayer.scrollWidth * 9) / 16 + 50 + "px";
    };
  },
});
