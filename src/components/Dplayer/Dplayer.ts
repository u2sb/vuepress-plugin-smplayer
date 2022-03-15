import {
  DPlayer,
  DPlayerOptions,
  DPlayerEvents,
  DPlayerVideo,
} from "../../type/Dplayer";
import SbBasePlayer from "../BasePlayer/SbBasePlayer";
export default class Dplayer extends SbBasePlayer<DPlayer, DPlayerOptions> {
  override async InitPlayer() {
    if (this.src) {
      return await import(
        // @ts-ignore
        /* webpackChunkName: "dplayer" */ "dplayer/dist/DPlayer.min.js"
      ).then(async ({ default: dplayer }) => {
        let useHls = false;
        let useFlv = false;
        let useDash = false;
        let useShakaDash = false;
        let useWebtorrent = false;
        this.src!.video.customType = this.src?.video.customType || {};

        // .m3u8 和 .flv 结尾的视频
        if (!this.src?.video.type) {
          if (this.src?.video.url.toLowerCase().endsWith(".m3u8")) {
            this.src.video.type = "hls";
          } else if (this.src?.video.url.toLowerCase().endsWith(".flv")) {
            this.src.video.type = "flv";
          } else if (this.src?.video.url.toLowerCase().endsWith(".mpd")) {
            this.src.video.type = "shakaDash";
          }
        }

        // 判断是否有自定义类型
        if (this.src?.video.type && typeof this.src.video.type == "string") {
          switch (this.src.video.type.toLowerCase()) {
            case "hls":
            case "m3u8":
              this.src.video.type = "smplayerDplayerHls";
              useHls = true;
              break;
            case "flv":
              this.src.video.type = "smplayerDplayerFlv";
              useFlv = true;
              break;
            case "dash":
              this.src.video.type = "smplayerDplayerDash";
              useDash = true;
              break;
            case "shakadash":
            case "shaka":
            case "shaka-dash":
              this.src.video.type = "smplayerDplayerShakaDash";
              useShakaDash = true;
              break;
            case "webtorrent":
              this.src.video.type = "smplayerDplayerWebtorrent";
              useWebtorrent = true;
              break;
          }
        }

        if (
          this.src?.video.quality != undefined &&
          this.src.video.quality.length > 0
        ) {
          this.src.video.quality.forEach((e: DPlayerVideo) => {
            // .m3u8 和 .flv 结尾的视频
            if (e.type == undefined) {
              if (e.url.toLowerCase().endsWith(".m3u8")) {
                e.type = "m3u8";
              } else if (e.url.toLowerCase().endsWith(".flv")) {
                e.type = "flv";
              } else if (e.url.toLowerCase().endsWith(".mpd")) {
                e.type = "shakaDash";
              }
            }

            if (e.type != undefined && typeof e.type == "string") {
              switch (e.type.toLowerCase()) {
                case "hls":
                case "m3u8":
                  e.type = "smplayerDplayerHls";
                  useHls = true;
                  break;
                case "flv":
                  e.type = "smplayerDplayerFlv";
                  useFlv = true;
                  break;
                case "dash":
                  e.type = "smplayerDplayerDash";
                  useDash = true;
                  break;
                case "shakadash":
                case "shaka":
                case "shaka-dash":
                  e.type = "smplayerDplayerShakaDash";
                  useShakaDash = true;
                  break;
                case "webtorrent":
                  e.type = "smplayerDplayerWebtorrent";
                  useWebtorrent = true;
                  break;
              }
            }
          });
        }

        // 自定义类型
        if (useHls) {
          Object.assign(this.src?.video.customType, {
            smplayerDplayerHls: function (
              video: DPlayerOptions,
              player: DPlayer
            ) {
              import(
                // @ts-ignore
                /* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js"
              ).then(({ default: Hls }) => {
                const hls = new Hls();
                hls.attachMedia(video);
                hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                  hls.loadSource(video.url);
                });
                player.on("destroy" as DPlayerEvents.destroy, function () {
                  hls.destroy();
                });
              });
            },
          });
        }

        if (useFlv) {
          Object.assign(this.src?.video.customType, {
            smplayerDplayerFlv: function (
              video: DPlayerOptions,
              player: DPlayer
            ) {
              import(
                // @ts-ignore
                /* webpackChunkName: "flv" */ "flv.js/dist/flv.min.js"
              ).then(({ default: flvjs }) => {
                const flvPlayer = flvjs.createPlayer({
                  type: "flv",
                  url: video.src,
                });
                flvPlayer.attachMediaElement(video);
                flvPlayer.load();
                player.on("destroy" as DPlayerEvents.destroy, function () {
                  flvPlayer.destroy();
                });
              });
            },
          });
        }

        if (useDash) {
          Object.assign(this.src?.video.customType, {
            smplayerDplayerDash: function (
              video: DPlayerOptions,
              player: DPlayer
            ) {
              import(
                // @ts-ignore
                /* webpackChunkName: "dash" */ "dashjs/dist/dash.all.min.js"
              ).then(({ default: dashjs }) => {
                const dashPlayer = dashjs.MediaPlayer().create();
                dashPlayer.initialize(video, video.src, false);
                player.on("destroy" as DPlayerEvents.destroy, function () {
                  dashPlayer.reset();
                });
              });
            },
          });
        }

        if (useShakaDash) {
          Object.assign(this.src?.video.customType, {
            smplayerDplayerShakaDash: function (
              video: DPlayerOptions,
              player: DPlayer
            ) {
              import(
                // @ts-ignore
                /* webpackChunkName: "shaka" */ "shaka-player/dist/shaka-player.compiled.js"
              ).then(({ default: shaka }) => {
                const shakaPlayer = new shaka.Player(video);
                shakaPlayer.load(video.src).then(function () {
                  player.on("destroy" as DPlayerEvents.destroy, function () {
                    shakaPlayer.destroy();
                  });
                });
              });
            },
          });
        }

        if (useWebtorrent) {
          Object.assign(this.src?.video.customType, {
            smplayerDplayerWebtorrent: function (
              video: DPlayerOptions,
              player: DPlayer
            ) {
              import(
                // @ts-ignore
                /* webpackChunkName: "webtorrent" */ "webtorrent/webtorrent.min.js"
              ).then(({ default: WebTorrent }) => {
                const client = new WebTorrent();
                client.add(video.src, function (torrent: any) {
                  const file = torrent.files.find(function (file: any) {
                    return file.name.endsWith(".mp4");
                  });
                  file.renderTo(video);
                  player.on("destroy" as DPlayerEvents.destroy, function () {
                    client.destroy();
                  });
                });
              });
            },
          });
        }

        this.player = this.src?.customInit
          ? await this.src.customInit(dplayer, this.src).then((player) => {
              this.player = player;
              return this.player;
            })
          : (new dplayer(this.src!) as DPlayer);

        return this.player;
      });
    }
  }

  override AddOnEvent(
    on?: Record<string, (player: DPlayer, src: DPlayerOptions) => void>
  ): void {
    if (on && this.player) {
      Object.keys(on).forEach((key) => {
        this.player!.on(key as DPlayerEvents, () =>
          on[key](this.player!, this.src!)
        );
      });
    }
  }
}
