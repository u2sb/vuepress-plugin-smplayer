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

      let importJs: Promise<any>;

      if (this.src?.type && typeof this.src.type == "string") {
        switch (this.src.type.toLowerCase()) {
          case "hls":
          case "m3u8":
            importJs = import("xgplayer-hls.js/dist/index.js");
            break;
          case "flv":
            importJs = import("xgplayer-flv.js/dist/index.js");
            break;
          case "dash":
            importJs = import("xgplayer-dash/dist/index.js");
            break;
          case "shakadash":
          case "shaka":
          case "shaka-dash":
            importJs = import("xgplayer-shaka/dist/index.js");
            break;
          case "music":
            importJs = import("xgplayer-music/dist/index.js");
            break;

          default:
            importJs = import("xgplayer/dist/index.js");
        }
      } else {
        importJs = import("xgplayer/dist/index.js");
      }

      return await importJs.then(async ({ default: xgplayer }) => {
        this.player = this.src?.customInit
          ? await this.src.customInit(xgplayer, this.src).then((player) => {
              return player;
            })
          : new xgplayer(this.src as IPlayerOptions);

        return this.player;
      });
    }
  }
}
