import {
  Audio as AplayerAudio,
  AplayerOptions,
  APlayer,
} from "../../type/Aplayer";
import SbBasePlayer from "../BasePlayer/SbBasePlayer";

export default class Aplayer extends SbBasePlayer<APlayer, AplayerOptions> {
  override async InitPlayer() {
    if (this.src) {
      return await Promise.all([
        // @ts-ignore
        import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.js"),

        import(
          // @ts-ignore
          /* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.css"
        ),
      ]).then(async ([{ default: aplayer }]) => {
        this.src!.customAudioType = this.src?.customAudioType || {};

        let useHls = false;

        this.src?.audio?.forEach((e: AplayerAudio) => {
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
              audioSrc: AplayerAudio,
              ap: APlayer
            ) {
              import(
                // @ts-ignore
                /* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js"
              ).then(({ default: Hls }) => {
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
              });
            },
          });
        }
        this.player = this.src?.customInit
          ? await this.src.customInit(aplayer, this.src).then((player) => {
              this.player = player as APlayer;
              return this.player;
            })
          : (new aplayer(this.src) as APlayer);

        return this.player;
      });
    }
  }

  override DestroyPlayer() {
    if (this.player && !this.src?.fixed) {
      this.player.destroy();
    }
  }
}
