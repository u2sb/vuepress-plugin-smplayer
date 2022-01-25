<template>
  <div class="mmedia">
    <div ref="mmplayer" class="artplayer-app" />
  </div>
</template>

<script>
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
    dash: {
      type: Boolean,
      default: DPLAYER.dash,
      required: false,
    },
    shakaDash: {
      type: Boolean,
      default: DPLAYER.shakaDash,
      required: false,
    },
    flv: {
      type: Boolean,
      default: DPLAYER.flv,
      required: false,
    },
    webtorrent: {
      type: Boolean,
      default: DPLAYER.webtorrent,
      required: false,
    },
    danmuku: {
      type: Boolean,
      default: DPLAYER.danmuku,
      required: false,
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
      if (this.hls) {
        import(/* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js").then(
          ({ default: Hls }) => {
            if (window) {
              window.Hls = Hls;
            }
          }
        );
      }
      if (this.dash) {
        import(
          /* webpackChunkName: "dashjs" */ "dashjs/dist/dash.all.min.js"
        ).then(({ default: dashjs }) => {
          if (window) {
            window.dashjs = dashjs;
          }
        });
      }
      if (this.shakaDash) {
        import(
          /* webpackChunkName: "shaka-player" */ "shaka-player/dist/shaka-player.compiled.js"
        ).then(({ default: shaka }) => {
          if (window) {
            window.shaka = shaka;
          }
        });
      }
      if (this.flv) {
        import(/* webpackChunkName: "flv" */ "flv.js/dist/flv.min.js").then(
          ({ default: flvjs }) => {
            if (window) {
              window.flvjs = flvjs;
            }
          }
        );
      }
      if (this.webtorrent) {
        import(
          /* webpackChunkName: "webtorrent" */ "webtorrent/webtorrent.min.js"
        ).then(({ default: webtorrent }) => {
          if (window) {
            window.webtorrent = webtorrent;
          }
        });
      }
      if (this.danmuku) {
        import(
          /* webpackChunkName: "artplayer-plugin-danmuku" */ "artplayer-plugin-danmuku/dist/artplayer-plugin-danmuku.js"
        ).then(({ default: artplayerPluginDanmuku }) => {
          if (window) {
            window.artplayerPluginDanmuku = artplayerPluginDanmuku;
          }
        });
      }

      import(
        /* webpackChunkName: "artplayer" */ "artplayer/dist/artplayer.js"
      ).then(({ default: Artplayer }) => {
        this.player = new Artplayer({
          container: this.$refs.mmplayer,
          ...this.src,
        });
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