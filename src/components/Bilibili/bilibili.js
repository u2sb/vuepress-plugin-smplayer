export default {
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
    let mmplayer = this.$refs.mmplayer;
    mmplayer.style.height = (mmplayer.scrollWidth * 9) / 16 + 50 + "px";

    window.onresize = function () {
      mmplayer.style.height = (mmplayer.scrollWidth * 9) / 16 + 50 + "px";
    };
  },
};
