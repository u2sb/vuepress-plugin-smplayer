import Artplayer from "./Artplayer";
import { ArtplayerOptions, ArtplayerConfig } from "../../types";
import Vue, { VNode, PropType } from "vue";
import merge from "ts-deepmerge";

declare const ARTPLAYER: ArtplayerConfig;

export default Vue.extend({
  props: {
    src: {
      type: Object as PropType<ArtplayerOptions>,
      required: true,
    },
    on: {
      type: Object as PropType<
        Record<string, (player: Artplayer, src: ArtplayerOptions) => void>
      >,
      default: () => ARTPLAYER.on,
      required: false,
    },
    width: {
      type: String,
      default: ARTPLAYER.width,
      required: false,
    },
    height: {
      type: Array as PropType<Array<number>>,
      default: () => ARTPLAYER.height,
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
      player: {} as Artplayer,
    };
  },

  async mounted(): Promise<void> {
    let sbplayer = this.$refs.sbplayer as HTMLElement;
    let on = merge(ARTPLAYER.on!, this.on);

    let src: ArtplayerOptions = {
      ...merge(ARTPLAYER.src, this.src),
      container: sbplayer,
    };
    this.player = new Artplayer(src);
    await this.player.InitPlayer();
    this.player.AddOnEvent(on);
    sbplayer.style.height =
      sbplayer.scrollWidth * this.height[0] + this.height[1] + "px";
  },

  beforeDestroy(): void {
    this.player?.DestroyPlayer();
  },
});
