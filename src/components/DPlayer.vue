<template>
  <div class="mmedia">
    <div ref="mmplayer" />
  </div>
</template>

<script>
import DPlayer from "dplayer";
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
  },

  beforeDestroy() {
    this.DestroyPlayer();
  },

  methods: {
    InitPlayer() {
      let src = merge(DPLAYER.src, this.src);
      this.player = new DPlayer({
        container: this.$refs.mmplayer,
        ...src,
      });

      this.player.on("fullscreen", function () {
        if (
          /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          screen.orientation.lock("landscape");
        }
      });
    },

    DestroyPlayer() {
      this.player.destroy();
    },
  },
};
</script>