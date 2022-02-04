<template>
  <div class="mmedia">
    <div ref="mmplayer" />
  </div>
</template>

<script>
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
      import(
        /* webpackChunkName: "dplayer" */ "dplayer/dist/DPlayer.min.js"
      ).then(({ default: DPlayer }) => {
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
      });
    },

    DestroyPlayer() {
      this.player.destroy();
    },
  },
};
</script>