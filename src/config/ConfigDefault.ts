import { Config } from "../type/Config";

const ConfigDefault: Config = {
  aplayer: {
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
    storageName: "vuepress-plugin-sbmedia",
  },
  dplayer: {
    src: {},
  },
  artplayer: {
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
  },
  xgplayer: {
    src: {
      fluid: true,
      fitVideoSize: "auto",
    },
  },
};

module.exports = ConfigDefault;
