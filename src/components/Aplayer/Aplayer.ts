import { Audio as AplayerAudio, AplayerOptions } from "../../type/Aplayer";
import SbBasePlayer from "../BasePlayer/SbBasePlayer";

export default class Aplayer extends SbBasePlayer<any, AplayerOptions> {
  override InitPlayer(src: AplayerOptions) {
    Promise.all([
      // @ts-ignore
      import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.js"),
      // @ts-ignore
      import(/* webpackChunkName: "aplayer" */ "aplayer/dist/APlayer.min.css"),
    ]).then(([{ default: APlayer }]) => {
      if (src.customAudioType == undefined) {
        src.customAudioType = {};
      }
      let useHls = false;

      src.audio?.forEach((e: AplayerAudio) => {
        if (e.type == undefined) {
          if (e.url.toLowerCase().endsWith(".m3u8")) {
            e.type = "hls";
          }
        }
        if (e.type != undefined && typeof e.type == "string") {
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
        Object.assign(src.customAudioType, {
          smplayerAplayerHls: function (
            audioElement: HTMLAudioElement,
            audio: AplayerAudio,
            player: any
          ) {
            // @ts-ignore
            import(/* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js").then(
              ({ default: Hls }) => {
                if (
                  audioElement.canPlayType("application/x-mpegURL") ||
                  audioElement.canPlayType("application/vnd.apple.mpegURL")
                ) {
                  audioElement.src = audio.url;
                } else if (Hls.isSupported()) {
                  const hls = new Hls();
                  hls.loadSource(audio.url);
                  hls.attachMedia(audioElement);
                  player.on("destroy", function () {
                    hls.destroy();
                  });
                } else {
                  player.notice("Error: HLS is not supported.");
                }
              }
            );
          },
        });
      }
      this.player = new APlayer(src);
    });
  }

  override DestroyPlayer() {
    if (this.player && !this.src?.fixed) {
      this.player.destroy();
    }
  }
}
