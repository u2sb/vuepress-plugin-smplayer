import merge from "deepmerge";
import Aplayer from "./Aplayer";
import { Aplayer as AplayerType } from "../../type/Config";
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

declare const APLAYER: AplayerType;

@Component
export default class AplayerVue extends Vue {
  @Prop({ type: Object, required: true }) src!: Record<string, any>;
  @Ref("mmplayer") mmplayer!: any;

  aplayer = new Aplayer();
  mounted() {
    let src = merge(APLAYER.src, this.src);
    this.aplayer.InitPlayer(src, this.mmplayer);
    this.$nextTick(() => {
      if (this.src.fixed) {
        const app = document.querySelector("#app");
        app?.append(this.$el);
      }
    });
  }

  beforeDestroy() {
    this.aplayer.DestroyPlayer();
  }
}
