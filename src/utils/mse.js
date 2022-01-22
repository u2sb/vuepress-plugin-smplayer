const hls = function (mediaElement, src, player) {
  import(/* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js").then(
    ({ default: Hls }) => {
      if (
        !mediaElement.canPlayType("application/x-mpegURL") &&
        !mediaElement.canPlayType("application/vnd.apple.mpegURL") &&
        Hls.isSupported()
      ) {
        const hls = new Hls();
        hls.attachMedia(mediaElement);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          hls.loadSource(src);
        });

        player.on("destroy", function () {
          hls.destroy();
        });
      }
    }
  );
}

const flv = function (mediaElement, src, player) {
  import(    /* webpackChunkName: "mpegts" */ "mpegts.js/dist/mpegts.js")
    .then(({ default: mpegts }) => {
      const flvPlayer = mpegts.createPlayer({
        type: "flv",
        url: src,
      });
      flvPlayer.attachMediaElement(mediaElement);
      flvPlayer.load();
      player.on("destroy", function () {
        flvPlayer.destroy();
      });
    });
}

const dash = function (mediaElement, src, player) {
  import(/* webpackChunkName: "dash" */ "dashjs/dist/dash.all.min.js").then(
    ({ default: dashjs }) => {
      const dashPlayer = dashjs.MediaPlayer().create();
      dashPlayer.initialize(mediaElement, src, false);
      player.on("destroy", function () {
        dashPlayer.reset();
      });
    })
}

const shakaDash = function (mediaElement, src, player) {
  import(/* webpackChunkName: "shaka-player" */ "shaka-player/dist/shaka-player.compiled.js").then(
    ({ default: shaka }) => {
      const shakaPlayer = new shaka.Player(mediaElement);
      shakaPlayer.load(src);
      player.on("destroy", function () {
        shakaPlayer.destroy();
      });
    }
  );
}

const webtorrent = function (mediaElement, src, player) {
  import(/* webpackChunkName: "webtorrent" */ "webtorrent/webtorrent.min.js").then(
    ({ default: WebTorrent }) => {
      const client = new WebTorrent();
      const torrent = client.add(src);
      torrent.on("ready", function () {
        const file = torrent.files.find(function (file) {
          return file.name.endsWith(".mp4");
        });
        file.renderTo(mediaElement);
      });
      player.on("destroy", function () {
        client.destroy();
      });
    }
  );
}


export { hls, flv, dash, shakaDash, webtorrent };
