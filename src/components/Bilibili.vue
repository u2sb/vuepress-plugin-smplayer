<template>
  <div class="mmedia">
    <iframe
      ref="mmplayer"
      class="bbplayer"
      :src="src"
      :allowfullscreen="allowfullscreen"
      scrolling="no"
      frameborder="0"
      :sandbox="sandbox"
    ></iframe>
  </div>
</template>

<script>
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
</script>

<style lang="stylus" scoped>
.bbplayer {
  width: 100%;
}
</style>
