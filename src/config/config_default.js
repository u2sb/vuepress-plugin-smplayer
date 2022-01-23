export default {
  aplayer: {
    lrcType: 3,
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
  },
  artplayer: {
    autoSize: !0,
    autoMini: !0,
    fullscreen: !0,
    fullscreenWeb: !0,
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
