<template>
  <div>
    <div ref="sbplayer" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { deepmerge as merge } from "deepmerge-ts";
import { hls, flv, dash, shakaDash, webtorrent } from "../../utils/mse";

export default defineComponent({
  props: {
    src: {
      type: Object,
      required: true,
    },
    on: {
      type: Object,
      default: () => {
        return ARTPLAYER.on;
      },
      required: false,
    },
    width: {
      type: String,
      default: XIGUA.width,
      required: false,
    },
    height: {
      type: Array,
      default: () => {
        return XIGUA.height;
      },
      required: false,
    },
  },

  mounted() {
    let on = merge(ARTPLAYER.on, this.on);
    let src = {
      ...merge(ARTPLAYER.src, this.src),
      container: this.$refs.sbplayer,
    };

    this.$nextTick(() => {
      this.initPlayer(src, on);
      let sbplayer = this.$refs.sbplayer;
      sbplayer.style.height = `${
        sbplayer.scrollWidth * this.height[0] + this.height[1]
      }px`;
    });
  },

  beforeDestroy() {
    if (this.player) {
      this.player.destroy();
    }
  },

  methods: {
    initPlayer(src, on) {
      import(
        /* webpackChunkName: "artplayer" */ "artplayer/dist/artplayer.js"
      ).then(({ default: artplayer }) => {
        let useHls = false;
        let useFlv = false;
        let useDash = false;
        let useShakaDash = false;
        let useWebtorrent = false;
        src.customType = src.customType || {};

        // 判断是否有自定义类型
        // .m3u8 和 .flv 结尾的视频
        if (!src.type) {
          if (src.url.toLowerCase().endsWith(".m3u8")) {
            src.type = "hls";
          } else if (src.url.toLowerCase().endsWith(".flv")) {
            src.type = "flv";
          } else if (src.url.toLowerCase().endsWith(".mpd")) {
            src.type = "shakaDash";
          }
        }

        if (src.type && typeof src.type == "string") {
          switch (src.type.toLowerCase()) {
            case "hls":
            case "m3u8":
              src.type = "smplayerArtplayerHls";
              useHls = true;
              break;
            case "flv":
              src.type = "smplayerArtplayerFlv";
              useFlv = true;
              break;
            case "dash":
              src.type = "smplayerArtplayerDash";
              useDash = true;
              break;
            case "shakadash":
            case "shaka":
            case "shaka-dash":
              src.type = "smplayerArtplayerShakaDash";
              useShakaDash = true;
              break;
            case "webtorrent":
              src.type = "smplayerArtplayerWebtorrent";
              useWebtorrent = true;
              break;
          }
        }

        if (src.quality != undefined && src.quality.length > 0) {
          src.quality.forEach((e) => {
            // .m3u8 和 .flv 结尾的视频
            if (e.type == undefined) {
              if (e.url.toLowerCase().endsWith(".m3u8")) {
                e.type = "m3u8";
              } else if (e.url.toLowerCase().endsWith(".flv")) {
                e.type = "flv";
              } else if (e.url.toLowerCase().endsWith(".mpd")) {
                e.type = "shakaDash";
              }
            }

            if (e.type != undefined && typeof e.type == "string") {
              switch (e.type.toLowerCase()) {
                case "hls":
                case "m3u8":
                  e.type = "smplayerArtplayerHls";
                  useHls = true;
                  break;
                case "flv":
                  e.type = "smplayerArtplayerFlv";
                  useFlv = true;
                  break;
                case "dash":
                  e.type = "smplayerArtplayerDash";
                  useDash = true;
                  break;
                case "shakadash":
                case "shaka":
                case "shaka-dash":
                  e.type = "smplayerArtplayerShakaDash";
                  useShakaDash = true;
                  break;
                case "webtorrent":
                  e.type = "smplayerArtplayerWebtorrent";
                  useWebtorrent = true;
                  break;
              }
            }
          });
        }

        // 自定义类型
        if (useHls) {
          Object.assign(src.customType, {
            smplayerArtplayerHls: (element, src, player) =>
              hls(element, src, player),
          });
        }
        if (useFlv) {
          Object.assign(src.customType, {
            smplayerArtplayerFlv: (element, src, player) =>
              flv(element, src, player),
          });
        }
        if (useDash) {
          Object.assign(src.customType, {
            smplayerArtplayerDash: (element, src, player) =>
              dash(element, src, player),
          });
        }
        if (useShakaDash) {
          Object.assign(src.customType, {
            smplayerArtplayerShakaDash: (element, src, player) =>
              shakaDash(element, src, player),
          });
        }
        if (useWebtorrent) {
          Object.assign(src.customType, {
            smplayerArtplayerWebtorrent: (element, src, player) =>
              webtorrent(element, src, player),
          });
        }

        this.player = new artplayer(src);

        // 播放器事件
        if (on && this.player) {
          Object.keys(on).forEach((key) => {
            this.player.on(key, () => on[key](this.player, src));
          });
        }
      });
    },
  },
});
</script>
