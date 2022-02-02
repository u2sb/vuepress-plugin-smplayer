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
  },
  mounted() {
    this.InitPlayer();
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