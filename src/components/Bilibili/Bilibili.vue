<template>
  <div>
    <iframe
      ref="sbplayer"
      :style="style"
      :src="src"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      :allowfullscreen="allowfullscreen"
      :sandbox="sandbox"
    >
    </iframe>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    bvid: {
      type: String,
      default: BILIBILI.bvid,
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
    sandbox: {
      type: String,
      default: BILIBILI.sandbox,
      required: false,
    },
    allowfullscreen: {
      type: [String, Boolean],
      default: BILIBILI.allowfullscreen,
      required: false,
    },
    width: {
      type: String,
      default: BILIBILI.width,
      required: false,
    },
    height: {
      type: Array,
      default: () => {
        return BILIBILI.height;
      },
      required: false,
    },
  },

  data() {
    return {
      style: `width: ${this.width}`,
      src: `//player.bilibili.com/player.html?bvid=${this.bvid}&page=${this.page}&danmaku=${this.danmaku}&t=${this.t}`,
    };
  },

  mounted() {
    this.$nextTick(() => {
      let sbplayer = this.$refs.sbplayer;
      sbplayer.style.height = `${
        sbplayer.scrollWidth * this.height[0] + this.height[1]
      }px`;
    });
  },
});
</script>
