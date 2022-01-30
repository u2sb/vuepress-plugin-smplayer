module.exports = {
  aplayer: {
    hls: false,
    src: {
      lrcType: 3,
    },
  },
  meting: {
    api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
    server: "tencent",
    type: "song",
    fixed: false,
    mini: false,
    autoplay: false,
    theme: "#2980b9",
    loop: "all",
    order: "list",
    preload: "auto",
    volume: 0.7,
    mutex: true,
    lrcType: 3,
    listFolded: false,
    listMaxHeight: "340px",
    storageName: "vuepress-plugin-mmedia",
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
