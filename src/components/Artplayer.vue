<template>
  <div class="mmedia">
    <div ref="mmplayer" class="artplayer-app" />
  </div>
</template>

<script>
import Artplayer from "artplayer";
import merge from "deepmerge";

export default {
  props: {
    src: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.InitPlayer();
    this.ChangeWidth();
  },

  beforeDestroy() {
    this.DestroyPlayer();
  },
  methods: {
    InitPlayer() {
      let src = merge(ARTPLAYER.src, this.src);
      this.player = new Artplayer({
        container: this.$refs.mmplayer,
        ...src,
      });
    },

    DestroyPlayer() {
      this.player.destroy();
    },

    ChangeWidth() {
      let mmplayer = this.$refs.mmplayer;
      mmplayer.style.height = (mmplayer.scrollWidth * 9) / 16 + "px";

      window.onresize = function () {
        mmplayer.style.height = (mmplayer.scrollWidth * 9) / 16 + "px";
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.artplayer-app {
  width: 100%;
}
</style>