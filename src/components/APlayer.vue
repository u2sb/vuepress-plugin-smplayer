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
    this.InitPlayer();
  },

  beforeDestroy() {
    this.DestroyPlayer();
  },
  methods: {
    InitPlayer() {
      Promise.all([
        import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.js"),
        import(
          /* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.css"
        ),
      ]).then(([{ default: APlayer }]) => {
        this.player = new APlayer({
          container: this.$refs.mmplayer,
          ...this.src,
        });
      });
    },

    DestroyPlayer() {
      this.player.destroy();
    },
  },
};
</script>