import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, h, onMounted, ref } from "vue";
import { checkIsMobile } from "../../utils/check.js";
import { useSize } from "../../utils/size.js";

import type { BilibiliOptions } from "../../options.js";
import type { VNode } from "vue";
// @ts-ignore
import { bilibili } from "@temp/SmplayerOptions.json";

import "./bilibili.css";

const BILIBILI = bilibili as BilibiliOptions;

export default defineComponent({
  props: {
    bvid: {
      type: String,
      default: BILIBILI.bvid!,
      required: true,
    },
    danmaku: {
      type: Boolean,
      default: BILIBILI.danmaku,
      required: false,
    },
    page: {
      type: Number,
      default: BILIBILI.page,
      required: false,
    },
    t: {
      type: Number,
      default: BILIBILI.t,
      required: false,
    },
    time: {
      type: Number,
      default: BILIBILI.t,
      required: false,
    },
    width: {
      type: [String, Number],
      default: BILIBILI.width,
      required: false,
    },
    height: {
      type: [String, Number],
      default: BILIBILI.height,
      required: false,
    },
    ratio: {
      type: [String, Number],
      default: BILIBILI.ratio,
    },
  },

  setup(props) {
    const isMobile = ref(false);
    const extraHeight = computed(() => (isMobile.value ? 0 : 68));
    const updateMobile = (): void => {
      isMobile.value =
        checkIsMobile(navigator.userAgent) || el.value!.clientWidth < 640;
    };

    const { el, width, height } = useSize<HTMLIFrameElement>(
      props,
      extraHeight
    );

    const videoLink = computed(
      () =>
        `https://player.bilibili.com/player.html?bvid=${props.bvid}&t=${
          props.t || props.time
        }&page=${props.page}&danmaku=${props.danmaku}`
    );

    onMounted(() => {
      updateMobile();
      useEventListener("orientationchange", () => updateMobile());
      useEventListener("resize", () => updateMobile());
    });

    return (): VNode[] => [
      h("iframe", {
        ref: el,
        // Tip: `https://www.bilibili.com/blackboard/newplayer.html?bvid=${props.bvid}&as_wide=1&page=1` only support whitelist sites now
        src: videoLink.value,
        class: "bili-iframe",
        allow:
          "accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture",
        style: {
          width: width.value,
          height: height.value,
        },
      }),
    ];
  },
});
