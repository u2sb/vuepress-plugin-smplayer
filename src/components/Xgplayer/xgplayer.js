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
      let src = merge(XGPLAYER.src, this.src);
      if (src.type == undefined) {
        if (src.url.toLowerCase().endsWith(".m3u8")) {
          src.type = "hls";
        } else if (src.url.toLowerCase().endsWith(".flv")) {
          src.type = "flv";
        } else if (src.url.toLowerCase().endsWith(".mpd")) {
          src.type = "shaka";
        }
      }

      let importJs;

      if (src.type != undefined && typeof src.type == "string") {
        switch (src.type.toLowerCase()) {
          case "hls":
          case "m3u8":
            importJs = import("xgplayer-hls.js/dist/index.js");
            break;
          case "flv":
            importJs = import("xgplayer-flv.js/dist/index.js");
            break;
          case "dash":
            importJs = import("xgplayer-dash/dist/index.js");
            break;
          case "shakadash":
          case "shaka":
          case "shaka-dash":
            importJs = import("xgplayer-shaka/dist/index.js");
            break;
          case "music":
            importJs = import("xgplayer-music/dist/index.js");
            break;

          default:
            importJs = import("xgplayer/dist/index.js");
        }
      } else {
        importJs = import("xgplayer/dist/index.js");
      }

      importJs.then(({ default: xgplayer }) => {
        this.player = new xgplayer({
          ...src,
          el: this.$refs.mmplayer,
        });
      });
    },
    DestroyPlayer() {
      this.player.destroy();
    },
  },
};
