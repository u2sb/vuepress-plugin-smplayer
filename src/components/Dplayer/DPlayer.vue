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
        return DPLAYER.on;
      },
      required: false,
    },
  },

  mounted() {
    let on = merge(DPLAYER.on, this.on);
    let src = {
      ...merge(DPLAYER.src, this.src),
      container: this.$refs.sbplayer,
    };

    this.$nextTick(() => {
      this.initPlayer(src, on);
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
        /* webpackChunkName: "dplayer" */ "dplayer/dist/DPlayer.min.js"
      ).then(({ default: dplayer }) => {
        let useHls = false;
        let useFlv = false;
        let useDash = false;
        let useShakaDash = false;
        let useWebtorrent = false;

        src.video.customType = src.video.customType || {};

        // .m3u8 和 .flv 结尾的视频
        if (!src.video.type) {
          if (src.video.url.toLowerCase().endsWith(".m3u8")) {
            src.video.type = "hls";
          } else if (src.video.url.toLowerCase().endsWith(".flv")) {
            src.video.type = "flv";
          } else if (src.video.url.toLowerCase().endsWith(".mpd")) {
            src.video.type = "shakaDash";
          }
        }

        // 判断是否有自定义类型
        if (src.video.type && typeof src.video.type == "string") {
          switch (src.video.type.toLowerCase()) {
            case "hls":
            case "m3u8":
              src.video.type = "smplayerDplayerHls";
              useHls = true;
              break;
            case "flv":
              src.video.type = "smplayerDplayerFlv";
              useFlv = true;
              break;
            case "dash":
              src.video.type = "smplayerDplayerDash";
              useDash = true;
              break;
            case "shakadash":
            case "shaka":
            case "shaka-dash":
              src.video.type = "smplayerDplayerShakaDash";
              useShakaDash = true;
              break;
            case "webtorrent":
              src.video.type = "smplayerDplayerWebtorrent";
              useWebtorrent = true;
              break;
          }
        }

        // 检查多种质量的视频格式
        if (src.video.quality != undefined && src.video.quality.length > 0) {
          src.video.quality.forEach((e) => {
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
                  e.type = "smplayerDplayerHls";
                  useHls = true;
                  break;
                case "flv":
                  e.type = "smplayerDplayerFlv";
                  useFlv = true;
                  break;
                case "dash":
                  e.type = "smplayerDplayerDash";
                  useDash = true;
                  break;
                case "shakadash":
                case "shaka":
                case "shaka-dash":
                  e.type = "smplayerDplayerShakaDash";
                  useShakaDash = true;
                  break;
                case "webtorrent":
                  e.type = "smplayerDplayerWebtorrent";
                  useWebtorrent = true;
                  break;
              }
            }
          });
        }

        // 自定义类型
        if (useHls) {
          Object.assign(src.video.customType, {
            smplayerDplayerHls: (element, dp) => hls(element, element.src, dp),
          });
        }
        if (useFlv) {
          Object.assign(src.video.customType, {
            smplayerDplayerFlv: (element, dp) => flv(element, element.src, dp),
          });
        }
        if (useDash) {
          Object.assign(src.video.customType, {
            smplayerDplayerDash: (element, dp) =>
              dash(element, element.src, dp),
          });
        }
        if (useShakaDash) {
          Object.assign(src.video.customType, {
            smplayerDplayerShakaDash: (element, dp) =>
              shakaDash(element, element.src, dp),
          });
        }
        if (useWebtorrent) {
          Object.assign(src.video.customType, {
            smplayerDplayerWebtorrent: (element, dp) =>
              webtorrent(element, element.src, dp),
          });
        }

        // 初始化播放
        this.player = new dplayer(src);

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
