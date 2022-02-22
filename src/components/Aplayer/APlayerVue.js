import merge from "deepmerge";
import APlayer from "./APlayer";

export default {
  props: {
    src: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    let src = merge(APLAYER.src, this.src);
    APlayer.InitPlayer(src, this.$refs.mmplayer);
    this.$nextTick(() => {
      if (this.src.fixed) {
        const app = document.querySelector("#app");
        app.append(this.$el);
      }
    });
  },

  beforeDestroy() {
    APlayer.DestroyPlayer();
  },
};
