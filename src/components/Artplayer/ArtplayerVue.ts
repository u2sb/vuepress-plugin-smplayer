import merge from "deepmerge";
import Artplayer from "./Artplayer";
import { Option as ArtplayerOptions } from "../../type/artplayer";
import { Artplayer as ArtplayerType } from "../../type/Config";
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

declare const ARTPLAYER: ArtplayerType;

@Component
export default class ArtplayerVue extends Vue {
  @Prop({ type: Object, required: true }) src!: ArtplayerOptions;
  @Ref("mmplayer") mmplayer!: any;

  artplayer = new Artplayer();
  mounted() {
    let src = merge(ARTPLAYER.src, this.src);
    this.artplayer.InitPlayer(src, this.mmplayer);
    this.artplayer.ChangeWidth(this.mmplayer);
  }

  beforeDestroy() {
    this.artplayer.DestroyPlayer();
  }
}
