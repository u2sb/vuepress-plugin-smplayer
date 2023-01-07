import { defineComponent, h, onBeforeUnmount, onMounted, PropType } from "vue";
import { deepmerge as merge } from "deepmerge-ts";
import { useSize } from "../../utils/size.js";
import * as mse from "../../utils/mse.js";

import type { VNode } from "vue";
import type {
  ArtPlayer,
  ArtplayerOption,
  SbArtPlayerOptions,
  SbArtPlayerPlayerOptions,
} from "../../options.js";

// @ts-ignore
import { artplayer } from "@temp/SmplayerOptions.json";

const ARTPLAYER = artplayer as SbArtPlayerOptions;

export default defineComponent({
  props: {
    src: {
      type: Object as PropType<SbArtPlayerPlayerOptions>,
      required: true,
    },
    width: {
      type: String,
      default: ARTPLAYER.width,
      required: false,
    },

    height: {
      type: [String, Number],
      default: ARTPLAYER.height,
      required: false,
    },
    ratio: {
      type: [String, Number],
      default: ARTPLAYER.ratio,
    },
  },

  setup(props) {
    const src = {
      ...merge(ARTPLAYER.src, props.src),
    };

    const { el, width, height } = useSize<HTMLDivElement>(props, 0);

    let artplayer: ArtPlayer;

    const initAPlayer = async () => {
      const { default: art } = await import("artplayer/dist/artplayer.js");
      src.container = el.value;
      src.customType = src.customType || {};
      src.type = src.type || mse.checkType(src.url!);

      switch (src.type) {
        case "m3u8":
        case "hls":
          src.customType[src.type] = mse.m3u8;
          break;
        case "flv":
          src.customType[src.type] = mse.flv;
          break;
        case "mpd":
        case "dash":
          src.customType[src.type] = mse.dash;
          break;
      }

      artplayer = new art(src as ArtplayerOption);
    };

    const destroyAPlayer = () => {
      artplayer.destroy();
    };

    onMounted(() => {
      initAPlayer();
    });
    onBeforeUnmount(() => {
      destroyAPlayer();
    });

    return (): VNode[] => [
      h("div", {
        ref: el,
        style: {
          width: width.value,
          height: height.value,
        },
      }),
    ];
  },
});
