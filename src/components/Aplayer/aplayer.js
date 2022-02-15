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
      Promise.all([
        import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.js"),
        import(
          /* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.css"
        ),
      ]).then(([{ default: APlayer }]) => {
        let src = merge(APLAYER.src, this.src);
        if (src.customAudioType == undefined) {
          src.customAudioType = {};
        }
        let useHls = false;

        src.audio.forEach((e) => {
          if (e.type == undefined) {
            if (e.url.toLowerCase().endsWith(".m3u8")) {
              e.type = "hls";
            }
          }
          if (e.type != undefined && typeof e.type == "string") {
            switch (e.type.toLowerCase()) {
              case "hls":
              case "m3u8":
                e.type = "mmediaAplayerHls";
                useHls = true;
                break;
            }
          }
        });
        if (useHls) {
          Object.assign(src.customAudioType, {
            mmediaAplayerHls: function (audioElement, audio, player) {
              import(
                /* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js"
              ).then(({ default: Hls }) => {
                if (
                  audioElement.canPlayType("application/x-mpegURL") ||
                  audioElement.canPlayType("application/vnd.apple.mpegURL")
                ) {
                  audioElement.src = audio.url;
                } else if (Hls.isSupported()) {
                  const hls = new Hls();
                  hls.loadSource(audio.url);
                  hls.attachMedia(audioElement);
                  player.on("destroy", function () {
                    hls.destroy();
                  });
                } else {
                  player.notice("Error: HLS is not supported.");
                }
              });
            },
          });
        }

        this.player = new APlayer({
          ...src,
          container: this.$refs.mmplayer,
        });
      });
    },

    DestroyPlayer() {
      if (this.player && !this.src.fixed) {
        this.player.destroy();
      }
    },
  },
};
