import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { VNode } from "vue";

@Component
export default class SbBasePlayerComponent<T> extends Vue {
  @Prop(Object) src!: T;
  @Prop({ type: String, default: "100%" }) width!: string;
  @Prop({ type: Array, default: () => [9 / 16, 0] }) height!: Array<number>;
  @Ref("sbplayer") sbplayer!: HTMLElement | any;
  render(): VNode {
    return (
      <div class="smplayer">
        <div ref="sbplayer" style={`width: ${this.width}`} />
      </div>
    );
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
