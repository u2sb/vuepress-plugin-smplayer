import Aplayer from "./Aplayer";
import { APlayerConfig, APlayerOptions, APlayer } from "../../types";
import { defineComponent, PropType, VNode } from "vue";
import { deepmerge as merge } from "deepmerge-ts";

declare const APLAYER: APlayerConfig;

export default defineComponent({
  props: {
    src: {
      type: Object as PropType<APlayerOptions>,
      required: true,
    },
    on: {
      type: Object as PropType<typeof APLAYER.on>,
      default: () => {
        return APLAYER.on;
      },
      required: false,
    },
  },

  render(): VNode {
    return (
      <div class="smplayer">
        <div ref="sbplayer" />
      </div>
    );
  },

  data() {
    return {
      player: {} as Aplayer,
    };
  },

  async mounted(): Promise<void> {
    let on = merge(APLAYER.on!, this.on!);
    let src: APlayerOptions = {
      ...merge(APLAYER.src, this.src),
      container: this.$refs.sbplayer as HTMLElement,
    };
    this.player = new Aplayer(src);
    await this.player.InitPlayer();
    this.player.AddOnEvent(on);

    this.$nextTick(() => {
      if (this.src.fixed) {
        const app = document.querySelector("#app");
        app?.append(this.$el);
      }
    });
  },

  beforeDestroy(): void {
    this.player?.DestroyPlayer();
  },
});
