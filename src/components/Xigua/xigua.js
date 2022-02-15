export default {
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
      type: String,
      default: XIGUA.allowfullscreen,
      required: false,
    },
  },
  data() {
    return {
      src: `//www.ixigua.com/iframe/${this.xid}?${
        this.id == null || thid.id == "" ? "" : "id=" + this.id + "&"
      }autoplay=${this.autoplay ? 1 : 0}&startTime=${this.startTime}`,
    };
  },
  mounted() {
    let mmplayer = this.$refs.mmplayer;
    mmplayer.style.height = (mmplayer.scrollWidth * 9) / 16 + "px";

    window.onresize = function () {
      mmplayer.style.height = (mmplayer.scrollWidth * 9) / 16 + "px";
    };
  },
};
