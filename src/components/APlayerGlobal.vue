<template>
  <APlayer :src="fixedSrc" />
</template>

<script>
import APlayer from "./APlayer.vue";

export default {
  props: {
    src: {
      type: Object,
      required: true,
    },
  },

  data() {
    this.src.fixed = true;
    return {
      fixedSrc: this.src,
    };
  },
};
</script>