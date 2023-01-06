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

    const initAPlayer = () => {
      Promise.all([
        import("aplayer"),
        import("aplayer/dist/APlayer.min.css"),
      ]).then(([{ default: aplayer }]) => {
        (src.container = el.value), (player = new aplayer(src));
      });
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
        id: "sb-aplayer",
        ref: el,
      }),
    ];
  },
});
