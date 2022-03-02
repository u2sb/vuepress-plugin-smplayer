import {
  DPlayer,
  DPlayerOptions,
  DPlayerEvents,
  DPlayerVideo,
} from "../../type/Dplayer";
import SbBasePlayer from "../BasePlayer/SbBasePlayer";
export default class Dplayer extends SbBasePlayer<DPlayer, DPlayerOptions> {
  InitPlayer(src: DPlayerOptions): void {
    import(
      // @ts-ignore
      /* webpackChunkName: "dplayer" */ "dplayer/dist/DPlayer.min.js"
    ).then(({ default: dplayer }) => {
      let useHls = false;
      let useFlv = false;
      let useDash = false;
      let useShakaDash = false;
      let useWebtorrent = false;
      if (src.video.customType == undefined) {
        src.video.customType = {};
      }

      // .m3u8 和 .flv 结尾的视频
      if (src.video.type == undefined) {
        if (src.video.url.toLowerCase().endsWith(".m3u8")) {
          src.video.type = "hls";
        } else if (src.video.url.toLowerCase().endsWith(".flv")) {
          src.video.type = "flv";
        } else if (src.video.url.toLowerCase().endsWith(".mpd")) {
          src.video.type = "shakaDash";
        }
      }

      // 判断是否有自定义类型
      if (src.video.type != undefined && typeof src.video.type == "string") {
        switch (src.video.type.toLowerCase()) {
          case "hls":
          case "m3u8":
            src.video.type = "smplayerDplayerHls";
            useHls = true;
            break;
          case "flv":
            src.video.type = "smplayerDplayerFlv";
            useFlv = true;
            break;
          case "dash":
            src.video.type = "smplayerDplayerDash";
            useDash = true;
            break;
          case "shakadash":
          case "shaka":
          case "shaka-dash":
            src.video.type = "smplayerDplayerShakaDash";
            useShakaDash = true;
            break;
          case "webtorrent":
            src.video.type = "smplayerDplayerWebtorrent";
            useWebtorrent = true;
            break;
        }
      }

      if (src.video.quality != undefined && src.video.quality.length > 0) {
        src.video.quality.forEach((e: DPlayerVideo) => {
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
        Object.assign(src.video.customType, {
          smplayerDplayerHls: function (
            video: DPlayerOptions,
            player: DPlayer
          ) {
            // @ts-ignore
            import(/* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js").then(
              ({ default: Hls }) => {
                const hls = new Hls();
                hls.loadSource(video.src);
                hls.attachMedia(video);
                player.on("destroy" as DPlayerEvents.destroy, function () {
                  hls.destroy();
                });
              }
            );
          },
        });
      }

      if (useFlv) {
        Object.assign(src.video.customType, {
          smplayerDplayerFlv: function (
            video: DPlayerOptions,
            player: DPlayer
          ) {
            // @ts-ignore
            import(/* webpackChunkName: "flv" */ "flv.js/dist/flv.min.js").then(
              ({ default: flvjs }) => {
                const flvPlayer = flvjs.createPlayer({
                  type: "flv",
                  url: video.src,
                });
                flvPlayer.attachMediaElement(video);
                flvPlayer.load();
                player.on("destroy" as DPlayerEvents.destroy, function () {
                  flvPlayer.destroy();
                });
              }
            );
          },
        });
      }

      if (useDash) {
        Object.assign(src.video.customType, {
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
        Object.assign(src.video.customType, {
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
        Object.assign(src.video.customType, {
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

      this.player = new dplayer(src) as DPlayer;
    });
  }

  DestroyPlayer(): void {
    this.player?.destroy();
  }

  AddCustomFun(src: DPlayerOptions) {
    if (src.on) {
      for (let key in src.on) {
        this.player?.on(key as DPlayerEvents, src.on[key]);
      }
    }
    if (src.customFun && this.player) {
      for (let key in src.customFun) {
        src.customFun[key](this.player, src);
      }
    }
  }
}
