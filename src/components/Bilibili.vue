<template>
  <div class="mmedia">
    <iframe
      class="bbplayer"
      :src="src"
      allowfullscreen="allowfullscreen"
      scrolling="no"
      frameborder="0"
      sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
    ></iframe>
    <script>
      var bbplayers = document.getElementsByClassName("bbplayer");
      bbplayers.forEach(function (item, index, arr) {
        item.style.height = item.scrollWidth * 0.76 + "px";
      });
      window.onresize = function () {
        bbplayers.forEach(function (item, index, arr) {
          item.style.height = item.scrollWidth * 0.76 + "px";
        });
      };
    </script>
  </div>
</template>

<script>
export default {
  name: "Bilibili",
  props: {
    bvid: {
      type: String,
      default: null,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
      required: false,
    },
    highQuality: {
      type: Boolean,
      default: false,
      required: false,
    },
    danmaku: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      src: `//player.bilibili.com/player.html?bvid=${this.bvid}&page=${
        this.page
      }&high_quality=${this.highQuality ? 1 : 0}&danmaku=${this.danmaku}`,
    };
  },
};
</script>

<style lang="stylus" scoped>
.bbplayer {
  width: 100%;
}
</style>
