import { Xgplayer as XGplayer, IPlayerOptions } from "../../type/Xgplayer";
import SbBasePlayer from "../BasePlayer/SbBasePlayer";

export default class Xgplayer extends SbBasePlayer<XGplayer, IPlayerOptions> {
  override async InitPlayer() {
    if (this.src) {
      if (!this.src?.type && typeof this.src?.url == "string") {
        if (this.src.url.toLowerCase().endsWith(".m3u8")) {
          this.src.type = "hls";
        } else if (this.src.url.toLowerCase().endsWith(".flv")) {
          this.src.type = "flv";
        } else if (this.src.url.toLowerCase().endsWith(".mpd")) {
          this.src.type = "shaka";
        }
      }

      let importJs;

      if (this.src?.type && typeof this.src.type == "string") {
        switch (this.src.type.toLowerCase()) {
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

      return await importJs.then(async ({ default: xgplayer }) => {
        this.player = this.src?.customInit
          ? await this.src.customInit(xgplayer, this.src).then((player) => {
              return player;
            })
          : (new xgplayer(this.src) as XGplayer);

        return this.player;
      });
    }
  }
}
