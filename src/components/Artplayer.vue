<template>
  <div class="mmedia">
    <div ref="mmplayer" class="artplayer-app" />
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
      default: ARTPLAYER.hls,
      required: false,
    },
    dash: {
      type: Boolean,
      default: ARTPLAYER.dash,
      required: false,
    },
    shakaDash: {
      type: Boolean,
      default: ARTPLAYER.shakaDash,
      required: false,
    },
    flv: {
      type: Boolean,
      default: ARTPLAYER.flv,
      required: false,
    },
    webtorrent: {
      type: Boolean,
      default: ARTPLAYER.webtorrent,
      required: false,
    },
    danmuku: {
      type: Object,
      default: ARTPLAYER.danmuku,
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
      if (this.hls && window && !window.Hls) {
        import(/* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js").then(
          ({ default: Hls }) => {
            window.Hls = Hls;
          }
        );
      }
      if (this.dash && window && !window.dashjs) {
        import(
          /* webpackChunkName: "dashjs" */ "dashjs/dist/dash.all.min.js"
        ).then(({ default: dashjs }) => {
          window.dashjs = dashjs;
        });
      }
      if (this.shakaDash && window && !window.shaka) {
        import(
          /* webpackChunkName: "shaka-player" */ "shaka-player/dist/shaka-player.compiled.js"
        ).then(({ default: shaka }) => {
          window.shaka = shaka;
        });
      }
      if (this.flv && window && !window.flvjs) {
        import(/* webpackChunkName: "flv" */ "flv.js/dist/flv.min.js").then(
          ({ default: flvjs }) => {
            window.flvjs = flvjs;
          }
        );
      }
      if (this.webtorrent && window && !window.webtorrent) {
        import(
          /* webpackChunkName: "webtorrent" */ "webtorrent/webtorrent.min.js"
        ).then(({ default: webtorrent }) => {
          window.webtorrent = webtorrent;
        });
      }
      if (this.danmuku) {
        import(
          /* webpackChunkName: "artplayer-plugin-danmuku" */ "artplayer-plugin-danmuku/dist/artplayer-plugin-danmuku.js"
        ).then(({ default: artplayerPluginDanmuku }) => {
          Object.assign(this.src, {
            plugins: [artplayerPluginDanmuku(this.danmuku)],
          });
        });
      }

      import(
        /* webpackChunkName: "artplayer" */ "artplayer/dist/artplayer.js"
      ).then(({ default: Artplayer }) => {
        let src = merge(ARTPLAYER.src, this.src);
        this.player = new Artplayer({
          container: this.$refs.mmplayer,
          ...src,
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