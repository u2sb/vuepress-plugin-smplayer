<template>
  <div>
    <div ref="sbplayer" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { deepmerge as merge } from "deepmerge-ts";
import { hls } from "../../utils/mse";

export default defineComponent({
  props: {
    src: {
      type: Object,
      required: true,
    },
    on: {
      type: Object,
      default: () => {
        return APLAYER.on;
      },
      required: false,
    },
  },

  mounted() {
    let on = merge(APLAYER.on, this.on);
    let src = {
      ...merge(APLAYER.src, this.src),
      container: this.$refs.sbplayer,
    };

    this.$nextTick(() => {
      this.initPlayer(src, on);
    });
  },

  beforeDestroy() {
    if (this.player && !src?.fixed) {
      this.player.destroy();
    }
  },

  methods: {
    initPlayer(src, on) {
      Promise.all([
        import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.js"),
        import(
          /* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.css"
        ),
      ]).then(async ([{ default: aplayer }]) => {
        let useHls = false;
        src.customAudioType = src["customAudioType"] || {};
        src.audio.forEach((e) => {
          if (!e.type) {
            if (e.url.toLowerCase().endsWith(".m3u8")) {
              e.type = "hls";
            }
          } else if (e.type && typeof e.type == "string") {
            switch (e.type.toLowerCase()) {
              case "hls":
              case "m3u8":
                e.type = "smplayerAplayerHls";
                useHls = true;
                break;
            }
          }
        });
        if (useHls) {
          Object.assign(src?.customAudioType, {
            smplayerAplayerHls: (audioElement, src, ap) =>
              hls(audioElement, src.url, ap),
          });
        }

        this.player = new aplayer(src);

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
