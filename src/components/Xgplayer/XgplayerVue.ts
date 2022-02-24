import merge from "deepmerge";
import Xgplayer from "./Xgplayer";
import { Xgplayer as XgplayerType } from "../../type/Config";
import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { IPlayerOptions } from "../../type/xgplayer";

declare const XGPLAYER: XgplayerType;

@Component
export default class XgplayerVue extends Vue {
  @Prop({ type: Object, required: true }) src!: IPlayerOptions;
  @Ref("mmplayer") mmplayer!: any;

  xgplayer = new Xgplayer();
  mounted() {
    let src = merge(XGPLAYER.src, this.src);
    this.xgplayer.InitPlayer(src, this.mmplayer);
  }

  beforeDestroy() {
    this.xgplayer.DestroyPlayer();
  }
}
