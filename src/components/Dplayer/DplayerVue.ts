import merge from "deepmerge";
import Dplayer from "./Dplayer";
import { Dplayer as DplayerType } from "../../type/Config";
import { DPlayerOptions } from "../../type/dplayer";
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

declare const DPLAYER: DplayerType;

@Component
export default class DplayerVue extends Vue {
  @Prop({ type: Object, required: true }) src!: DPlayerOptions;
  @Ref("mmplayer") mmplayer!: HTMLElement;

  dplayer: Dplayer = new Dplayer();

  mounted() {
    let src = merge(DPLAYER.src, this.src);
    this.dplayer.InitPlayer(src, this.mmplayer);
  }

  beforeDestroy() {
    this.dplayer.DestroyPlayer();
  }
}
