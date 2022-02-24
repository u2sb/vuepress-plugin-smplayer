export default class Aplayer {
  player: any;
  src: any;
  InitPlayer(src: Record<string, any>, container: any) {
    this.src = src;
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

      src.audio.forEach((e: any) => {
        if (e.type == undefined) {
          if (e.url.toLowerCase().endsWith(".m3u8")) {
            e.type = "hls";
          }
        }
        if (e.type != undefined && typeof e.type == "string") {
          switch (e.type.toLowerCase()) {
            case "hls":
            case "m3u8":
              e.type = "sbmediaAplayerHls";
              useHls = true;
              break;
          }
        }
      });
      if (useHls) {
        Object.assign(src.customAudioType, {
          sbmediaAplayerHls: function (
            audioElement: any,
            audio: Record<string, any>,
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

      this.player = new APlayer({
        ...src,
        container: container,
      });
    });
  }

  DestroyPlayer() {
    if (this.player && !this.src.fixed) {
      this.player.destroy();
    }
  }
}
