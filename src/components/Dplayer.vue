<template>
  <div class="mmedia">
    <div ref="mmplayer" />
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
      default: DPLAYER.hls,
      required: false,
    },
  },
  mounted() {
    this.initplayer();
  },

  methods: {
    initplayer() {
      if (this.hls) {
        import(/* webpackChunkName: "hls" */ "hls.js").then(
          ({ default: Hls }) => {
            if (window) {
              window.Hls = Hls;
            }
          }
        );
      }
      if (this.dash) {
        import(/* webpackChunkName: "dashjs" */ "dashjs").then(
          ({ default: dashjs }) => {
            if (window) {
              window.dashjs = dashjs;
            }
          }
        );
      }
      if (this.shakaDash) {
        import(/* webpackChunkName: "shaka-player" */ "shaka-player").then(
          ({ default: shaka }) => {
            if (window) {
              window.shaka = shaka;
            }
          }
        );
      }
      if (this.flv) {
        import(/* webpackChunkName: "flv" */ "flv.js").then(
          ({ default: flvjs }) => {
            if (window) {
              window.flvjs = flvjs;
            }
          }
        );
      }
      if (this.webtorrent) {
        import(/* webpackChunkName: "webtorrent" */ "webtorrent").then(
          ({ default: webtorrent }) => {
            if (window) {
              window.webtorrent = webtorrent;
            }
          }
        );
      }

      import(/* webpackChunkName: "dplayer" */ "dplayer").then(
        ({ default: DPlayer }) => {
          let dp = new DPlayer(
            Object.assign(this.src, {
              container: this.$refs.mmplayer,
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
        }
      );
    },
  },
};
</script>