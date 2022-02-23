import Artplayer, { Option as ArtplayerOptions } from "../../type/artplayer";

export default class ArtplayerVue {
  player: Artplayer | undefined;

  InitPlayer(src: ArtplayerOptions, container: HTMLElement): void {
    import(
      // @ts-ignore
      /* webpackChunkName: "artplayer" */ "artplayer/dist/artplayer.js"
    ).then(({ default: artplayer }) => {
      let useHls = false;
      let useFlv = true;
      let useDash = false;
      let useShakaDash = false;
      let useWebtorrent = false;
      if (src.customType == undefined) {
        src.customType = {};
      }

      // 判断是否有自定义类型

      // .m3u8 和 .flv 结尾的视频
      if (src.type == undefined) {
        if (src.url?.toLowerCase().endsWith(".m3u8")) {
          src.type = "hls";
        } else if (src.url?.toLowerCase().endsWith(".flv")) {
          src.type = "flv";
        } else if (src.url?.toLowerCase().endsWith(".mpd")) {
          src.type = "shakaDash";
        }
      }

      if (src.type != undefined && typeof src.type == "string") {
        switch (src.type.toLowerCase()) {
          case "hls":
          case "m3u8":
            src.type = "mmediaArtplayerHls";
            useHls = true;
            break;
          case "flv":
            src.type = "mmediaArtplayerFlv";
            useFlv = true;
            break;
          case "dash":
            src.type = "mmediaArtplayerDash";
            useDash = true;
            break;
          case "shakadash":
          case "shaka":
          case "shaka-dash":
            src.type = "mmediaArtplayerShakaDash";
            useShakaDash = true;
            break;
          case "webtorrent":
            src.type = "mmediaArtplayerWebtorrent";
            useWebtorrent = true;
            break;
        }
      }

      if (src.quality != undefined && src.quality.length > 0) {
        src.quality.forEach((e) => {
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
                e.type = "mmediaArtplayerHls";
                useHls = true;
                break;
              case "flv":
                e.type = "mmediaArtplayerFlv";
                useFlv = true;
                break;
              case "dash":
                e.type = "mmediaArtplayerDash";
                useDash = true;
                break;
              case "shakadash":
              case "shaka":
              case "shaka-dash":
                e.type = "mmediaArtplayerShakaDash";
                useShakaDash = true;
                break;
              case "webtorrent":
                e.type = "mmediaArtplayerWebtorrent";
                useWebtorrent = true;
                break;
            }
          }
        });
      }

      // 自定义类型
      if (useHls) {
        Object.assign(src.customType, {
          mmediaArtplayerHls: function (
            video: HTMLVideoElement,
            url: string,
            player: Artplayer
          ) {
            import(
              // @ts-ignore
              /* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js"
            ).then(({ default: Hls }) => {
              const hls = new Hls();
              hls.loadSource(url);
              hls.attachMedia(video);
              player.on("destroy", function () {
                hls.destroy();
              });
            });
          },
        });
      }
      if (useFlv) {
        Object.assign(src.customType, {
          mmediaArtplayerFlv: function (
            video: HTMLVideoElement,
            url: string,
            player: Artplayer
          ) {
            import(
              // @ts-ignore
              /* webpackChunkName: "flv" */ "flv.js/dist/flv.min.js"
            ).then(({ default: flvjs }) => {
              const flvPlayer = flvjs.createPlayer({
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
        Object.assign(src.customType, {
          mmediaArtplayerDash: function (
            video: HTMLVideoElement,
            url: string,
            player: Artplayer
          ) {
            import(
              // @ts-ignore
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
        Object.assign(src.customType, {
          mmediaArtplayerShakaDash: function (
            video: HTMLVideoElement,
            url: string,
            player: Artplayer
          ) {
            import(
              // @ts-ignore
              /* webpackChunkName: "shaka" */ "shaka-player/dist/shaka-player.compiled.js"
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
        Object.assign(src.customType, {
          mmediaArtplayerWebtorrent: function (
            video: HTMLVideoElement,
            url: string,
            player: Artplayer
          ) {
            import(
              // @ts-ignore
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

      this.player = new artplayer({
        ...src,
        container: container,
      }) as Artplayer;
    });
  }

  DestroyPlayer() {
    this.player?.destroy();
  }

  ChangeWidth(container: HTMLElement) {
    container.style.height = (container.scrollWidth * 9) / 16 + "px";
  }
}