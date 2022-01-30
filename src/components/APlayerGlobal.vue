<template>
  <APlayer :src="fixedSrc" />
</template>

<script>
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