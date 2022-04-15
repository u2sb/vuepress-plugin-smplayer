import Xgplayer from "./Xgplayer";
import {
  Xgplayer as XGplayer,
  IPlayerOptions,
  XgplayerConfig,
} from "../../types";
import { defineComponent, PropType, VNode } from "vue";
import { deepmerge as merge } from "deepmerge-ts";

declare const XGPLAYER: XgplayerConfig;

export default defineComponent({
  props: {
    src: {
      type: Object as PropType<IPlayerOptions>,
      required: true,
    },
    on: {
      type: Object as PropType<typeof XGPLAYER.on>,
      default: () => {
        return XGPLAYER.on;
      },
      required: false,
    },
    width: {
      type: String,
      default: XGPLAYER.width,
      required: false,
    },
    height: {
      type: Array as PropType<Array<number>>,
      default: () => {
        return XGPLAYER.height;
      },
      required: false,
    },
  },
  render(): VNode {
    return (
      <div class="smplayer">
        <div ref="sbplayer" style={`width: ${this.width}`} />
      </div>
    );
  },
  data() {
    return {
      player: {} as Xgplayer,
    };
  },

  async mounted(): Promise<void> {
    let on = merge(XGPLAYER.on!, this.on!);

    let src = {
      ...merge(XGPLAYER.src, this.src),
      el: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Xgplayer(src);
    await this.player.InitPlayer();
    this.player.AddOnEvent(on);
  },

  beforeDestroy(): void {
    this.player?.DestroyPlayer();
  },
});
