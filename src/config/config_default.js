module.exports = {
  aplayer: {
    src: {
      lrcType: 3,
    },
  },
  meting: {
    api: "https://api.i-meto.com/meting/api",
  },
  dplayer: {
    hls: false,
    dash: false,
    shakaDash: false,
    flv: false,
    webtorrent: false,
    src: {},
  },
  artplayer: {
    hls: false,
    dash: false,
    shakaDash: false,
    flv: false,
    webtorrent: false,
    src: {
      fullscreen: true,
      autoSize: true,
      setting: true,
    },
  },
  bilibili: {
    page: 1,
    danmaku: !0,
    allowfullscreen: "allowfullscreen",
    sandbox:
      "allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups",
  },
  xigua: {
    autoplay: !1,
    startTime: 0,
    allowfullscreen: "allowfullscreen",
    sandbox:
      "allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups",
    width: "100%",
    max_width: "850px",
    margin: "auto",
  },
};
