import { Xigua as XiguaType } from "../../type/Config";
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

declare const XIGUA: XiguaType;

@Component
export default class XiguaVue extends Vue {
  @Prop({ required: true }) xid!: string;
  @Prop(String) id: string | undefined;
  @Prop({ default: XIGUA.autoplay }) autoplay!: boolean;
  @Prop({ default: XIGUA.startTime }) startTime!: number;
  @Prop({ default: XIGUA.allowfullscreen }) allowfullscreen!: string;
  @Prop({ default: XIGUA.sandbox }) sandbox!: string;
  @Ref("mmplayer") mmplayer!: any;

  data() {
    return {
      src: `//www.ixigua.com/iframe/${this.xid}?${
        this.id ? "id=" + this.id + "&" : ""
      }autoplay=${this.autoplay ? 1 : 0}&startTime=${this.startTime}`,
    };
  }

  mounted() {
    this.mmplayer.style.height = (this.mmplayer.scrollWidth * 9) / 16 + "px";
  }
}
