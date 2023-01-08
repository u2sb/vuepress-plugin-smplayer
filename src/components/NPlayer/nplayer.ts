import { defineComponent, h, onBeforeUnmount, onMounted } from "vue";
import { deepmerge as merge } from "deepmerge-ts";
import { useSize } from "../../utils/size.js";
import * as mse from "../../utils/mse.js";

import type { VNode } from "vue";
import type { SbNPlayerOptions } from "../../options.js";

// @ts-ignore
import { nplayer } from "@temp/SmplayerOptions.json";
const NPLAYER = nplayer as SbNPlayerOptions;

export default defineComponent({
  props: {
    src: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: NPLAYER.width,
      required: false,
    },

    height: {
      type: [String, Number],
      default: NPLAYER.height,
      required: false,
    },
    ratio: {
      type: [String, Number],
      default: NPLAYER.ratio,
    },
  },

  setup(props) {
    const src = {
      ...merge(NPLAYER.src, props.src),
    };

    const { el, width, height } = useSize<HTMLDivElement>(props, 0);

    let nplayer: any;

    const initNPlayer = async () => {
      const { default: NPlayer } = await import("nplayer/dist/index.min.js");
      src.container = el.value;
      nplayer = new NPlayer(src);
      src.type = src.type || mse.checkType(src.src!);
      if(src.type){
        switch (src.type) {
          case "m3u8":
          case "hls":
            await mse.m3u8(nplayer.video, src.src!, nplayer);
            break;
          case "flv":
            await mse.flv(nplayer.video, src.src!, nplayer);
            break;
          case "mpd":
          case "dash":
            await mse.dash(nplayer.video, src.src!, nplayer);
            break;
        }
      }

      nplayer.mount(el.value);
    };

    const destroyNPlayer = () => {
      nplayer.dispose();
    };

    onMounted(() => {
      initNPlayer();
    });
    onBeforeUnmount(() => {
      destroyNPlayer();
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
