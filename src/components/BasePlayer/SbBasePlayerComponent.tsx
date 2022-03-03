import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { VNode } from "vue";
import SbBasePlayer from "./SbBasePlayer";

@Component
export default class SbBasePlayerComponent<T, U> extends Vue {
  @Prop(Object) src!: U;
  @Prop({ type: Object, default: () => ({}) }) on!: Record<
    string,
    (player: T, src: U) => void
  >;
  @Prop({ type: String, default: "100%" }) width!: string;
  @Prop({ type: Array, default: () => [9 / 16, 0] }) height!: Array<number>;
  @Ref("sbplayer") sbplayer!: HTMLElement | any;

  player: SbBasePlayer<T, U> | undefined;

  render(): VNode {
    return (
      <div class="smplayer">
        <div ref="sbplayer" style={`width: ${this.width}`} />
      </div>
    );
  }

  beforeDestroy(): void {
    this.player?.DestroyPlayer();
  }
}

export {
  SbBasePlayerComponent as BasePlayerComponent,
  VNode,
  Vue,
  Component,
  Prop,
  Ref,
};
