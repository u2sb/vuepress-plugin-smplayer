import { Xgplayer as XGplayer, IPlayerOptions } from "../../type/xgplayer";

export default class Xgplayer {
  player: XGplayer | undefined;
  InitPlayer(src: IPlayerOptions, container: any) {
    if (src.type == undefined && typeof src.url == "string") {
      if (src.url.toLowerCase().endsWith(".m3u8")) {
        src.type = "hls";
      } else if (src.url.toLowerCase().endsWith(".flv")) {
        src.type = "flv";
      } else if (src.url.toLowerCase().endsWith(".mpd")) {
        src.type = "shaka";
      }
    }

    let importJs;

    if (src.type != undefined && typeof src.type == "string") {
      switch (src.type.toLowerCase()) {
        case "hls":
        case "m3u8":
          // @ts-ignore
          importJs = import("xgplayer-hls.js/dist/index.js");
          break;
        case "flv":
          // @ts-ignore
          importJs = import("xgplayer-flv.js/dist/index.js");
          break;
        case "dash":
          // @ts-ignore
          importJs = import("xgplayer-dash/dist/index.js");
          break;
        case "shakadash":
        case "shaka":
        case "shaka-dash":
          // @ts-ignore
          importJs = import("xgplayer-shaka/dist/index.js");
          break;
        case "music":
          // @ts-ignore
          importJs = import("xgplayer-music/dist/index.js");
          break;

        default:
          // @ts-ignore
          importJs = import("xgplayer/dist/index.js");
      }
    } else {
      // @ts-ignore
      importJs = import("xgplayer/dist/index.js");
    }

    importJs.then(({ default: xgplayer }) => {
      this.player = new xgplayer({
        ...src,
        el: container,
      }) as XGplayer;
    });
  }
  DestroyPlayer() {
    this.player?.destroy();
  }
}
