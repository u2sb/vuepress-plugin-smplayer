import { Config } from "../type/Config";

const ConfigDefault: Config = {
  aplayer: {
    src: {
      lrcType: 3,
    },
    width: "100%",
    on: {},
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
    storageName: "vuepress-plugin-smplayer",
  },
  dplayer: {
    src: {
      container: null,
    },
    width: "100%",
    on: {
      fullscreen: () => {
        if (
          /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          screen.orientation.lock("landscape");
        }
      },
    },
  },
  artplayer: {
    src: {
      url: "",
      fullscreen: true,
      autoSize: true,
      setting: true,
    },
    width: "100%",
    height: [9 / 16, 0],
    on: {},
  },
  bilibili: {
    page: 1,
    danmaku: !0,
    allowfullscreen: "allowfullscreen",
    sandbox:
      "allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups",
    width: "100%",
    height: [9 / 16, 70],
  },
  xigua: {
    autoplay: !1,
    startTime: 0,
    allowfullscreen: "allowfullscreen",
    sandbox:
      "allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups",
    width: "100%",
    height: [9 / 16, 0],
  },
  xgplayer: {
    src: {
      url: "",
      fluid: true,
      fitVideoSize: "auto",
    },
    width: "100%",
    on: {},
  },
};

module.exports = ConfigDefault;
