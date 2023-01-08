export const checkType = (url: string) => {
  switch (true) {
    case url.endsWith(".m3u8"):
      return "m3u8";
    case url.endsWith(".flv"):
      return "flv";
    case url.endsWith(".mpd"):
      return "mpd";
    default:
      return "mp4";
  }
};

export const m3u8 = async (
  mediaElement: HTMLMediaElement,
  src: string,
  player: any
) => {
  if (
    mediaElement.canPlayType("application/x-mpegURL") ||
    mediaElement.canPlayType("application/vnd.apple.mpegURL")
  ) {
    mediaElement.src = src;
  } else {
    const { default: Hls } = await import("hls.js/dist/hls.min.js");
    const hls = new Hls();
    hls.attachMedia(mediaElement);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      hls.loadSource(src);
    });

    player.on("destroy", function () {
      hls.destroy();
    });
  }
};

export const flv = async (
  mediaElement: HTMLMediaElement,
  src: string,
  player: any
) => {
  const { default: mpegts } = await import("mpegts.js/dist/mpegts.js");
  const flvPlayer = mpegts.createPlayer({
    type: "flv",
    url: src,
  });
  flvPlayer.attachMediaElement(mediaElement);
  flvPlayer.load();

  player.on("destroy", function () {
    flvPlayer.destroy();
  });
};

export const dash = async (
  mediaElement: HTMLMediaElement,
  src: string,
  player: any
) => {
  const { default: dashjs } = await import("dashjs/dist/dash.all.min.js");
  const dashPlayer = dashjs.MediaPlayer().create();
  dashPlayer.initialize(mediaElement, src, false);

  player.on("destroy", function () {
    dashPlayer.destroy();
  });
};
