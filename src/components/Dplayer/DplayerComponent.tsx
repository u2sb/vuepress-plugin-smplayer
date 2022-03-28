import Dplayer from "./Dplayer";
import { DPlayer, DPlayerOptions, DPlayerConfig } from "../../types";
import Vue, { VNode, PropType } from "vue";
import merge from "ts-deepmerge";

declare const DPLAYER: DPlayerConfig;

export default Vue.extend({
  props: {
    src: {
      type: Object as PropType<DPlayerOptions>,
      required: true,
    },
    on: {
      type: Object as PropType<
        Record<string, (player: DPlayer, src: DPlayerOptions) => void>
      >,
      default: () => DPLAYER.on,
      required: false,
    },
    width: {
      type: String,
      default: DPLAYER.width,
      required: false,
    },
    height: {
      type: Array as PropType<Array<number>>,
      default: () => DPLAYER.height,
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
      player: {} as Dplayer,
    };
  },

  async mounted(): Promise<void> {
    let on = merge(DPLAYER.on!, this.on);
    let src: DPlayerOptions = {
      ...merge(DPLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Dplayer(src);
    await this.player.InitPlayer();
    this.player.AddOnEvent(on);
  },

  beforeDestroy(): void {
    this.player?.DestroyPlayer();
  },
});
