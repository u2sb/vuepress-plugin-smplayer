import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { VNode } from "vue";

@Component
export default class SbBasePlayerComponent<T> extends Vue {
  @Prop(Object) src!: T;
  @Ref("sbplayer") sbplayer!: HTMLElement | any;
  render(): VNode {
    return (
      <div class="smplayer">
        <div ref="sbplayer" />
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
