declare module "artplayer/dist/artplayer.js" {
  import Artplayer from "artplayer";
  export = Artplayer;
}

declare module "nplayer/dist/index.min.js"

declare module "hls.js/dist/hls.min.js" {
  import Hls from "hls.js";
  export = Hls;
}

declare module "mpegts.js/dist/mpegts.js" {
  import Mpegts from "mpegts.js";
  export = Mpegts;
}

declare module "dashjs/dist/dash.all.min.js" {
  import dashjs from "dashjs";
  export = dashjs;
}

declare module "vue3-audio-player" {
  import { PropType } from "vue";
  export interface AudioPlayerOption {
    src: string;
    title?: string;
    coverImage?: string;
    coverRotate?: boolean;
    progressBarColor?: string;
    indicatorColor?: string;
  }
  const _default: import("vue").DefineComponent<
    {
      option: {
        type: PropType<AudioPlayerOption>;
        default: AudioPlayerOption;
      };
    },
    {
      onAudioEnded: () => void;
      onAudioPlay: () => void;
      onAudioPause: () => void;
      onLoadMetaData: (e: any) => void;
      onTimeUpdate: (event: any) => void;
      play: () => void;
      pause: () => void;
      togglePlayer: () => void;
      formatSecond: (second: number) => string;
      handleProgressPanStart: (event: any) => void;
      handleProgressPanEnd: (event: any) => void;
      handleProgressPanMove: (event: any) => void;
      handleClickProgressWrap: (event: any) => void;
      audioProgressWrap: import("vue").Ref<any>;
      audioProgressPoint: import("vue").Ref<any>;
      audioProgress: import("vue").Ref<any>;
      IconPlay: string;
      IconPause: string;
      CoverImageDefault: string;
      isPlaying: import("vue").Ref<boolean>;
      isDragging: import("vue").Ref<boolean>;
      currentTime: import("vue").Ref<number>;
      totalTime: import("vue").Ref<number>;
      totalTimeStr: import("vue").Ref<string>;
      audioPlayer: import("vue").Ref<any>;
      option_: import("vue").Ref<{
        src: string;
        title?: string | undefined;
        coverImage?: string | undefined;
        coverRotate?: boolean | undefined;
        progressBarColor?: string | undefined;
        indicatorColor?: string | undefined;
      }>;
    },
    unknown,
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    (
      | "loadedmetadata"
      | "playing"
      | "play"
      | "play-error"
      | "timeupdate"
      | "pause"
      | "ended"
      | "progress-start"
      | "progress-end"
      | "progress-move"
      | "progress-click"
    )[],
    | "loadedmetadata"
    | "playing"
    | "play"
    | "play-error"
    | "timeupdate"
    | "pause"
    | "ended"
    | "progress-start"
    | "progress-end"
    | "progress-move"
    | "progress-click",
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<
      import("vue").ExtractPropTypes<{
        option: {
          type: PropType<AudioPlayerOption>;
          default: AudioPlayerOption;
        };
      }>
    > & {
      onLoadedmetadata?: ((...args: any[]) => any) | undefined;
      onPlaying?: ((...args: any[]) => any) | undefined;
      onPlay?: ((...args: any[]) => any) | undefined;
      "onPlay-error"?: ((...args: any[]) => any) | undefined;
      onTimeupdate?: ((...args: any[]) => any) | undefined;
      onPause?: ((...args: any[]) => any) | undefined;
      onEnded?: ((...args: any[]) => any) | undefined;
      "onProgress-start"?: ((...args: any[]) => any) | undefined;
      "onProgress-end"?: ((...args: any[]) => any) | undefined;
      "onProgress-move"?: ((...args: any[]) => any) | undefined;
      "onProgress-click"?: ((...args: any[]) => any) | undefined;
    },
    {
      option: AudioPlayerOption;
    }
  >;
  export default _default;
}
