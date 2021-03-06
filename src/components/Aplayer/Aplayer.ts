import { AplayerOptionsAudio, APlayerOptions, APlayer } from "../../types";

export default class Aplayer {
  constructor(src?: APlayerOptions) {
    if (src) {
      this.src = src;
    }
  }
  src?: APlayerOptions;
  player?: APlayer;

  async InitPlayer(): Promise<APlayer | undefined> {
    if (this.src) {
      return await Promise.all([
        import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.js"),
        import(
          /* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.css"
        ),
      ]).then(async ([{ default: aplayer }]): Promise<APlayer | undefined> => {
        this.src!.customAudioType = this.src?.customAudioType || {};

        let useHls = false;

        this.src?.audio?.forEach((e: AplayerOptionsAudio) => {
          if (!e.type) {
            if (e.url.toLowerCase().endsWith(".m3u8")) {
              e.type = "hls";
            }
          }
          if (e.type && typeof e.type == "string") {
            switch (e.type.toLowerCase()) {
              case "hls":
              case "m3u8":
                e.type = "smplayerAplayerHls";
                useHls = true;
                break;
            }
          }
        });
        if (useHls) {
          Object.assign(this.src?.customAudioType, {
            smplayerAplayerHls: function (
              audioElement: HTMLAudioElement,
              audioSrc: AplayerOptionsAudio,
              ap: APlayer
            ) {
              import(/* webpackChunkName: "hls" */ "hls.js/dist/hls.js").then(
                ({ default: Hls }) => {
                  let isPlaying = ap.audio.paused === false ? true : false;
                  if (
                    audioElement.canPlayType("application/x-mpegURL") ||
                    audioElement.canPlayType("application/vnd.apple.mpegURL")
                  ) {
                    audioElement.src = audioSrc.url;
                  } else if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.attachMedia(audioElement);
                    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                      hls.loadSource(audioSrc.url);
                    });

                    ap.on("destroy", function () {
                      hls.destroy();
                    });
                  } else {
                    ap.notice("Error: HLS is not supported.");
                  }

                  if (isPlaying) {
                    ap.play();
                  }
                }
              );
            },
          });
        }
        this.player = this.src?.customInit
          ? await this.src
              .customInit(aplayer, this.src)
              .then((player: APlayer) => {
                this.player = player;
                return this.player;
              })
          : new aplayer(this.src);

        return this.player;
      });
    }
  }

  DestroyPlayer() {
    if (this.player && !this.src?.fixed) {
      this.player.destroy();
    }
  }

  AddOnEvent(
    on?: Record<string, (player: APlayer, src: APlayerOptions) => void>
  ): void {
    if (on && this.player) {
      Object.keys(on).forEach((key) => {
        this.player!.on(key, () => on[key](this.player!, this.src!));
      });
    }
  }
}
