import { defineComponent, h, PropType } from "vue";
import AudioPlayer from "vue3-audio-player";
import { deepmerge as merge } from "deepmerge-ts";

import type { VNode } from "vue";
import type { AudioPlayerOption } from "vue3-audio-player";
import type { Vue3AudioPlayerOptions } from "../../options.js";


import "vue3-audio-player/dist/style.css";
import "./audioPlayer.css"

// @ts-ignore
import { vue3AudioPlayer } from "@temp/SmplayerOptions.json";

const AUDIOPLAYER = vue3AudioPlayer as Vue3AudioPlayerOptions;

export default defineComponent({
  props: {
    src: {
      type: Object as PropType<AudioPlayerOption>,
      required: true,
    },
  },
  setup(props) {
    const src = {
      ...merge(AUDIOPLAYER.src, props.src),
    };

    return (): VNode[] => [
      h(
        "div",
        {
          class: "smplayer-audio",
        },
        [
          h(AudioPlayer, {
            option: src,
          }),
        ]
      ),
    ];
  },
});
