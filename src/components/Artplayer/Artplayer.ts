import { Artplayer, ArtplayerOptions } from "../../type/Artplayer";
import SbBasePlayer from "../BasePlayer/SbBasePlayer";

export default class ArtplayerVue extends SbBasePlayer<
  Artplayer,
  ArtplayerOptions
> {
  override async InitPlayer() {
    if (this.src) {
      return await import(
        /* webpackChunkName: "artplayer" */ "artplayer/dist/artplayer.js"
      ).then(async ({ default: artplayer }) => {
        let useHls = false;
        let useFlv = false;
        let useDash = false;
        let useShakaDash = false;
        let useWebtorrent = false;
        this.src!.customType = this.src?.customType || {};

        // 判断是否有自定义类型

        // .m3u8 和 .flv 结尾的视频
        if (!this.src?.type) {
          if (this.src?.url?.toLowerCase().endsWith(".m3u8")) {
            this.src.type = "hls";
          } else if (this.src?.url?.toLowerCase().endsWith(".flv")) {
            this.src.type = "flv";
          } else if (this.src?.url?.toLowerCase().endsWith(".mpd")) {
            this.src.type = "shakaDash";
          }
        }

        if (this.src?.type && typeof this.src.type == "string") {
          switch (this.src.type.toLowerCase()) {
            case "hls":
            case "m3u8":
              this.src.type = "smplayerArtplayerHls";
              useHls = true;
              break;
            case "flv":
              this.src.type = "smplayerArtplayerFlv";
              useFlv = true;
              break;
            case "dash":
              this.src.type = "smplayerArtplayerDash";
              useDash = true;
              break;
            case "shakadash":
            case "shaka":
            case "shaka-dash":
              this.src.type = "smplayerArtplayerShakaDash";
              useShakaDash = true;
              break;
            case "webtorrent":
              this.src.type = "smplayerArtplayerWebtorrent";
              useWebtorrent = true;
              break;
          }
        }

        if (this.src?.quality != undefined && this.src.quality.length > 0) {
          this.src.quality.forEach((e) => {
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
                  e.type = "smplayerArtplayerHls";
                  useHls = true;
                  break;
                case "flv":
                  e.type = "smplayerArtplayerFlv";
                  useFlv = true;
                  break;
                case "dash":
                  e.type = "smplayerArtplayerDash";
                  useDash = true;
                  break;
                case "shakadash":
                case "shaka":
                case "shaka-dash":
                  e.type = "smplayerArtplayerShakaDash";
                  useShakaDash = true;
                  break;
                case "webtorrent":
                  e.type = "smplayerArtplayerWebtorrent";
                  useWebtorrent = true;
                  break;
              }
            }
          });
        }

        // 自定义类型
        if (useHls) {
          Object.assign(this.src?.customType, {
            smplayerArtplayerHls: function (
              video: HTMLVideoElement,
              url: string,
              player: Artplayer
            ) {
              import(/* webpackChunkName: "hls" */ "hls.js/dist/hls.js").then(
                ({ default: Hls }) => {
                  const hls = new Hls();
                  hls.attachMedia(video);
                  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    hls.loadSource(url);
                  });
                  player.on("destroy", function () {
                    hls.destroy();
                  });
                }
              );
            },
          });
        }
        if (useFlv) {
          Object.assign(this.src?.customType, {
            smplayerArtplayerFlv: function (
              video: HTMLVideoElement,
              url: string,
              player: Artplayer
            ) {
              import(
                /* webpackChunkName: "mpegts" */ "mpegts.js/dist/mpegts.js"
              ).then(({ default: mpegts }) => {
                const flvPlayer = mpegts.createPlayer({
                  type: "flv",
                  url: url,
                });
                flvPlayer.attachMediaElement(video);
                flvPlayer.load();
                player.on("destroy", function () {
                  flvPlayer.destroy();
                });
              });
            },
          });
        }

        if (useDash) {
          Object.assign(this.src?.customType, {
            smplayerArtplayerDash: function (
              video: HTMLVideoElement,
              url: string,
              player: Artplayer
            ) {
              import(
                /* webpackChunkName: "dash" */ "dashjs/dist/dash.all.min.js"
              ).then(({ default: dashjs }) => {
                const dashPlayer = dashjs.MediaPlayer().create();
                dashPlayer.initialize(video, url, false);
                player.on("destroy", function () {
                  dashPlayer.reset();
                });
              });
            },
          });
        }

        if (useShakaDash) {
          Object.assign(this.src?.customType, {
            smplayerArtplayerShakaDash: function (
              video: HTMLVideoElement,
              url: string,
              player: Artplayer
            ) {
              import(
                /* webpackChunkName: "shaka-player" */ "shaka-player/dist/shaka-player.compiled.js"
              ).then(({ default: shaka }) => {
                const shakaPlayer = new shaka.Player(video);
                shakaPlayer.load(url).then(function () {
                  player.on("destroy", function () {
                    shakaPlayer.destroy();
                  });
                });
              });
            },
          });
        }

        if (useWebtorrent) {
          Object.assign(this.src?.customType, {
            smplayerArtplayerWebtorrent: function (
              video: HTMLVideoElement,
              url: string,
              player: Artplayer
            ) {
              import(
                /* webpackChunkName: "webtorrent" */ "webtorrent/webtorrent.min.js"
              ).then(({ default: WebTorrent }) => {
                const client = new WebTorrent();
                client.add(url, function (torrent: any) {
                  const file = torrent.files.find(function (file: any) {
                    return file.name.endsWith(".mp4");
                  });
                  file.renderTo(video);
                  player.on("destroy", function () {
                    client.destroy();
                  });
                });
              });
            },
          });
        }

        this.player = this.src?.customInit
          ? await this.src.customInit(artplayer, this.src).then((player) => {
              this.player = player;
              return this.player;
            })
          : (new artplayer(this.src!) as Artplayer);

        return this.player;
      });
    }
  }
}
