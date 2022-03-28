import { Xgplayer as XGplayer, IPlayerOptions } from "../../types";

export default class Xgplayer {
  constructor(src?: IPlayerOptions) {
    if (src) {
      this.src = src;
    }
  }
  src?: IPlayerOptions;
  player?: XGplayer;

  async InitPlayer() {
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
      let importXg = import("xgplayer/dist/index.js");

      if (this.src?.type && typeof this.src.type == "string") {
        switch (this.src.type.toLowerCase()) {
          case "hls":
          case "m3u8":
            importJs = Promise.all([
              import("xgplayer-hls.js/dist/index.js"),
              importXg,
            ]);
            break;
          case "flv":
            importJs = Promise.all([
              import("xgplayer-flv.js/dist/index.js"),
              importXg,
            ]);
            break;
          case "dash":
            importJs = Promise.all([
              import("xgplayer-dash/dist/index.js"),
              importXg,
            ]);
            break;
          case "shakadash":
          case "shaka":
          case "shaka-dash":
            importJs = Promise.all([
              import("xgplayer-shaka/dist/index.js"),
              importXg,
            ]);
            break;
          case "music":
            importJs = Promise.all([
              import("xgplayer-music/dist/index.js"),
              importXg,
            ]);
            break;

          default:
            importJs = import("xgplayer/dist/index.js");
        }
      } else {
        importJs = Promise.all([importXg]);
      }

      return await importJs.then(async ([{ default: xgplayer }]) => {
        this.player = this.src?.customInit
          ? await this.src.customInit(xgplayer, this.src).then((player) => {
              return player;
            })
          : new xgplayer(this.src as IPlayerOptions);

        return this.player;
      });
    }
  }

  DestroyPlayer() {
    this.player?.destroy();
  }

  AddOnEvent(
    on?: Record<string, (player: XGplayer, src: IPlayerOptions) => void>
  ): void {
    if (on && this.player) {
      Object.keys(on).forEach((key) => {
        this.player!.on(key, () => on[key](this.player!, this.src!));
      });
    }
  }
}
