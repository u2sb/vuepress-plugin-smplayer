import { Bilibili as BilibiliType } from "../../type/Config";
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

declare const BILIBILI: BilibiliType;

@Component
export default class BilibiliVue extends Vue {
  @Prop({ required: true }) bvid!: string;
  @Prop({ default: BILIBILI.danmaku }) danmaku!: boolean;
  @Prop({ default: BILIBILI.page }) page!: number;
  @Prop({ default: BILIBILI.allowfullscreen }) allowfullscreen!: string;
  @Prop({ default: BILIBILI.sandbox }) sandbox!: string;
  @Ref("mmplayer") mmplayer!: any;

  data() {
    return {
      src: `//player.bilibili.com/player.html?bvid=${this.bvid}&page=${this.page}&danmaku=${this.danmaku}`,
    };
  }

  mounted() {
    this.mmplayer.style.height =
      (this.mmplayer.scrollWidth * 9) / 16 + 50 + "px";
  }
}
