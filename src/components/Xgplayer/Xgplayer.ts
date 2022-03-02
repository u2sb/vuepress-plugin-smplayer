import { Xgplayer as XGplayer, IPlayerOptions } from "../../type/Xgplayer";
import SbBasePlayer from "../BasePlayer/SbBasePlayer";

export default class Xgplayer extends SbBasePlayer<XGplayer, IPlayerOptions> {
  override InitPlayer(src: IPlayerOptions) {
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
      if (src.customInit) {
        src.customInit(xgplayer, src).then((player) => {
          this.player = player;
          this.AddCustomFun(src);
        });
      } else {
        this.player = new xgplayer(src) as XGplayer;
        this.AddCustomFun(src);
      }
    });
  }
  DestroyPlayer() {
    this.player?.destroy();
  }

  AddCustomFun(src: IPlayerOptions) {
    super.AddCustomFun(src);
    if (src.once) {
      for (let key in src.once) {
        this.player?.once(key, src.once[key]);
      }
    }
  }
}
