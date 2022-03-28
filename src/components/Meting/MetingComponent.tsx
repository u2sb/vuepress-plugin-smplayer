import Meting from "./Meting";
import { MetingConfig, AplayerOptionsAudio } from "../../types";
import Vue, { VNode, PropType } from "vue";

declare const METING: MetingConfig;

export default Vue.extend({
  props: {
    id: {
      required: false,
      type: String,
      default: "",
    },
    server: {
      required: false,
      type: String,
      default: METING.server,
    },
    type: {
      required: false,
      type: String,
      default: METING.type,
    },
    auto: {
      required: false,
      type: String,
      default: "",
    },
    fixed: {
      required: false,
      type: Boolean,
      default: METING.fixed,
    },
    mini: {
      required: false,
      type: Boolean,
      default: METING.mini,
    },
    autoplay: {
      required: false,
      type: Boolean,
      default: METING.autoplay,
    },
    theme: {
      required: false,
      type: String,
      default: METING.theme,
    },
    loop: {
      required: false,
      type: String,
      default: METING.loop,
    },
    order: {
      required: false,
      type: String,
      default: METING.order,
    },
    preload: {
      required: false,
      type: String,
      default: METING.preload,
    },
    volume: {
      required: false,
      type: Number,
      default: METING.volume,
    },
    mutex: {
      required: false,
      type: Boolean,
      default: METING.mutex,
    },
    lrcType: {
      required: false,
      type: Number,
      default: METING.lrcType,
    },
    listFolded: {
      required: false,
      type: Boolean,
      default: METING.listFolded,
    },
    listMaxHeight: {
      required: false,
      type: String,
      default: METING.listMaxHeight,
    },
    storageName: {
      required: false,
      type: String,
      default: METING.storageName,
    },
    api: {
      required: false,
      type: String,
      default: METING.api,
    },
    audio: {
      required: false,
      type: Array as PropType<Array<AplayerOptionsAudio>>,
    },
    list: {
      required: false,
      type: Array as PropType<Array<MetingConfig>>,
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
      meting: {} as Meting,
    };
  },

  async mounted() {
    let src = this.$props;
    this.meting = new Meting();
    await this.meting.InitMeting(src, this.$refs.sbplayer as HTMLElement);
  },

  beforeDestroy() {
    this.meting?.DestroyPlayer();
  },
});
