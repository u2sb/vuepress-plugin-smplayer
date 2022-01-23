<template>
  <div class="mmedia">
    <div ref="mmediadplayer" />
  </div>
</template>

<script>
export default {
  props: {
    dplayer: {
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
      default: DPLAYER.hls,
      required: false,
    },
  },
  mounted() {
    this.initdplayer();
  },

  methods: {
    initdplayer() {
      if (this.hls) {
        import(/* webpackChunkName: "hls.js" */ "hls.js/dist/hls.min.js").then(
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
        import(/* webpackChunkName: "flv.js" */ "flv.js/dist/flv.min.js").then(
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

      import(
        /* webpackChunkName: "dplayer" */ "dplayer/dist/DPlayer.min.js"
      ).then(({ default: DPlayer }) => {
        let dp = new DPlayer(
          Object.assign(this.dplayer, {
            container: this.$refs.mmediadplayer,
          })
        );
        dp.on("fullscreen", function () {
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
  },
};
</script>