export default class Dplayer {
  player: any;

  InitPlayer(src: Record<string, any>, container: HTMLElement): void {
    import(
      // @ts-ignore
      /* webpackChunkName: "dplayer" */ "dplayer/dist/DPlayer.min.js"
    ).then(({ default: DPlayer }) => {
      let useHls = false;
      let useFlv = true;
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
            src.video.type = "mmediaDplayerHls";
            useHls = true;
            break;
          case "flv":
            src.video.type = "mmediaDplayerFlv";
            useFlv = true;
            break;
          case "dash":
            src.video.type = "mmediaDplayerDash";
            useDash = true;
            break;
          case "shakadash":
          case "shaka":
          case "shaka-dash":
            src.video.type = "mmediaDplayerShakaDash";
            useShakaDash = true;
            break;
          case "webtorrent":
            src.video.type = "mmediaDplayerWebtorrent";
            useWebtorrent = true;
            break;
        }
      }

      if (src.video.quality != undefined && src.video.quality.length > 0) {
        src.video.quality.forEach((e: any) => {
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
                e.type = "mmediaDplayerHls";
                useHls = true;
                break;
              case "flv":
                e.type = "mmediaDplayerFlv";
                useFlv = true;
                break;
              case "dash":
                e.type = "mmediaDplayerDash";
                useDash = true;
                break;
              case "shakadash":
              case "shaka":
              case "shaka-dash":
                e.type = "mmediaDplayerShakaDash";
                useShakaDash = true;
                break;
              case "webtorrent":
                e.type = "mmediaDplayerWebtorrent";
                useWebtorrent = true;
                break;
            }
          }
        });
      }

      // 自定义类型
      if (useHls) {
        Object.assign(src.video.customType, {
          mmediaDplayerHls: function (video: any, player: any) {
            // @ts-ignore
            import(/* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js").then(
              ({ default: Hls }) => {
                const hls = new Hls();
                hls.loadSource(video.src);
                hls.attachMedia(video);
                player.on("destroy", function () {
                  hls.destroy();
                });
              }
            );
          },
        });
      }

      if (useFlv) {
        Object.assign(src.video.customType, {
          mmediaDplayerFlv: function (video: any, player: any) {
            // @ts-ignore
            import(/* webpackChunkName: "flv" */ "flv.js/dist/flv.min.js").then(
              ({ default: flvjs }) => {
                const flvPlayer = flvjs.createPlayer({
                  type: "flv",
                  url: video.src,
                });
                flvPlayer.attachMediaElement(video);
                flvPlayer.load();
                player.on("destroy", function () {
                  flvPlayer.destroy();
                });
              }
            );
          },
        });
      }

      if (useDash) {
        Object.assign(src.video.customType, {
          mmediaDplayerDash: function (video: any, player: any) {
            import(
              // @ts-ignore
              /* webpackChunkName: "dash" */ "dashjs/dist/dash.all.min.js"
            ).then(({ default: dashjs }) => {
              const dashPlayer = dashjs.MediaPlayer().create();
              dashPlayer.initialize(video, video.src, false);
              player.on("destroy", function () {
                dashPlayer.reset();
              });
            });
          },
        });
      }

      if (useShakaDash) {
        Object.assign(src.video.customType, {
          mmediaDplayerShakaDash: function (video: any, player: any) {
            import(
              // @ts-ignore
              /* webpackChunkName: "shaka" */ "shaka-player/dist/shaka-player.compiled.js"
            ).then(({ default: shaka }) => {
              const shakaPlayer = new shaka.Player(video);
              shakaPlayer.load(video.src).then(function () {
                player.on("destroy", function () {
                  shakaPlayer.destroy();
                });
              });
            });
          },
        });
      }

      if (useWebtorrent) {
        Object.assign(src.video.customType, {
          mmediaDplayerWebtorrent: function (video: any, player: any) {
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
                player.on("destroy", function () {
                  client.destroy();
                });
              });
            });
          },
        });
      }

      this.player = new DPlayer({
        ...src,
        container: container,
      });

      this.player.on("fullscreen", function () {
        if (
          /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          screen.orientation.lock("landscape");
        }
      });
    });
  }

  DestroyPlayer(): void {
    this.player.destroy();
  }
}
