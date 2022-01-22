<template>
  <div>
    <iframe
      ref="sbplayer"
      :style="style"
      :src="src"
      :allowfullscreen="allowfullscreen"
      scrolling="no"
      frameborder="0"
      :sandbox="sandbox"
    ></iframe>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    xid: {
      type: String,
      default: null,
      required: true,
    },
    id: {
      type: String,
      default: null,
      required: false,
    },
    autoplay: {
      type: Boolean,
      default: XIGUA.autoplay,
      required: false,
    },
    startTime: {
      type: Number,
      default: XIGUA.startTime,
      required: false,
    },
    sandbox: {
      type: String,
      default: XIGUA.sandbox,
      required: false,
    },
    allowfullscreen: {
      type: [String, Boolean],
      default: XIGUA.allowfullscreen,
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

  data() {
    return {
      style: `width: ${this.width}`,
      src: `//www.ixigua.com/iframe/${this.xid}?${
        this.id ? "id=" + this.id + "&" : ""
      }autoplay=${this.autoplay ? 1 : 0}&startTime=${this.startTime}`,
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
