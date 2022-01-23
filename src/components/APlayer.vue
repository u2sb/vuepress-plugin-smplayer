<template>
  <div class="mmedia">
    <div ref="mmplayer" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.initplayer();
  },

  methods: {
    initplayer() {
      Promise.all([
        import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.js"),
        import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.css"),
      ]).then(([{ default: APlayer }]) => {
        let ap = new APlayer(
          Object.assign(this.src, {
            container: this.$refs.mmplayer,
          })
        );
      });
    },
  },
};
</script>