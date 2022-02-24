import Meting from "./Meting";
import merge from "deepmerge";
import { Meting as MetingType } from "../../type/Config";
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

declare const METING: MetingType;

@Component
export default class MetingVue extends Vue {
  @Prop({ type: String, default: "" }) id: string | undefined;
  @Prop({ type: String, default: METING.server }) server: string | undefined;
  @Prop({ type: String, default: METING.type }) type: string | undefined;
  @Prop({ type: String, default: "" }) auto: string | undefined;
  @Prop({ type: Boolean, default: METING.fixed }) fixed: boolean | undefined;
  @Prop({ type: Boolean, default: METING.mini }) mini: boolean | undefined;
  @Prop({ type: Boolean, default: METING.autoplay }) autoplay:
    | boolean
    | undefined;
  @Prop({ type: String, default: METING.theme }) theme: string | undefined;
  @Prop({ type: String, default: METING.loop }) loop: string | undefined;
  @Prop({ type: String, default: METING.order }) order: string | undefined;
  @Prop({ type: String, default: METING.preload }) preload: string | undefined;
  @Prop({ type: Number, default: METING.volume }) volume: number | undefined;
  @Prop({ type: Boolean, default: METING.mutex }) mutex: boolean | undefined;
  @Prop({ type: Number, default: METING.lrcType }) lrcType: number | undefined;
  @Prop({ type: Boolean, default: METING.listFolded }) listFolded:
    | boolean
    | undefined;
  @Prop({ type: String, default: METING.listMaxHeight }) listMaxHeight:
    | string
    | undefined;
  @Prop({ type: String, default: METING.storageName }) storageName:
    | string
    | undefined;
  @Prop({ type: String, default: METING.api }) api: string | undefined;
  @Prop({ type: Array }) audio: Array<any> | undefined;
  @Prop({ type: Array }) list: Array<any> | undefined;

  @Ref("mmplayer") mmplayer!: any;

  meting = new Meting();

  mounted() {
    let src = this.$props;
    this.meting.InitMeting(src, this.mmplayer);
  }

  beforeDestroy() {
    this.meting.DestroyPlayer();
  }
}
