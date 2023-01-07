import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
import { deepmerge as merge } from "deepmerge-ts";
import type { VNode } from "vue";
// @ts-ignore
import { aplayer } from "@temp/SmplayerOptions.json";

export default defineComponent({
  props: {
    src: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const el = ref(HTMLDivElement);
    const src = {
      ...merge(aplayer.src, props.src),
    };

    let player: any;

    const initAPlayer = async () => {
      const { default: APlayer } = await import("aplayer/dist/APlayer.min.js");
      await import("aplayer/dist/APlayer.min.css");
      src.container = el.value;
      player = new APlayer(src);
    };

    const destroyAPlayer = () => {
      player.destroy();
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
      }),
    ];
  },
});
