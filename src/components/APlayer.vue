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
    hls: {
      type: Boolean,
      default: DPLAYER.hls,
      required: false,
    },
  },
  mounted() {
    this.InitPlayer();
    this.$nextTick(() => {
      if (this.src.fixed) {
        const app = document.querySelector("#app");
        app.append(this.$el);
      }
    });
  },

  beforeDestroy() {
    this.DestroyPlayer();
  },
  methods: {
    InitPlayer() {
      if (this.hls) {
        import(/* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js").then(
          ({ default: Hls }) => {
            if (window) {
              window.Hls = Hls;
            }
          }
        );
      }
      Promise.all([
        import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.js"),
        import(
          /* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.css"
        ),
      ]).then(([{ default: APlayer }]) => {
        let src = merge(APLAYER.src, this.src);
        this.player = new APlayer({
          container: this.$refs.mmplayer,
          ...src,
        });
      });
    },

    DestroyPlayer() {
      if (!this.src.fixed) {
        this.player.destroy();
      }
    },
  },
};
</script>