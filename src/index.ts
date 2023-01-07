import { getDirname, path } from "@vuepress/utils";
import { deepmerge } from "deepmerge-ts";

import type { App, PluginObject } from "@vuepress/core";
import type { SmplayerPluginsOptions } from "./options.js";

const __dirname = getDirname(import.meta.url);

const OptionDefault: SmplayerPluginsOptions = {
  bilibili: {
    page: 1,
    danmaku: !0,
    t: 0,
    width: "100%",
    ratio: 16 / 9,
  },
  xigua: {
    autoplay: !1,
    startTime: 0,
    width: "100%",
    ratio: 16 / 9,
  },
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
    storageName: "vuepress-plugin-smplayer",
  },
  artplayer: {
    width: "100%",
    ratio: 16 / 9,
    src: {
      fullscreen: true,
      autoSize: true,
      setting: true,
      whitelist: ["*"],
    },
  },
};

const SmplayerPlugin = (options: SmplayerPluginsOptions = {}): PluginObject => {
  options = deepmerge(OptionDefault, options);
  return {
    name: "vuepress-plugin-smplayer",
    async onPrepared(app: App) {
      await app.writeTemp("SmplayerOptions.json", JSON.stringify(options));
    },
    clientConfigFile: path.resolve(__dirname, "client.js"),
    extendsBundlerOptions: (bundlerOptions, app) => {
      // 修改 @vuepress/bundler-vite 的配置项
      if (app.options.bundler.name === "@vuepress/bundler-vite") {
        bundlerOptions.viteOptions ??= {};
        bundlerOptions.viteOptions.optimizeDeps = {
          include: [
            "aplayer",
            "aplayer/dist/APlayer.min.js",
            "artplayer/dist/artplayer.js",
          ],
        };
      }
    },
  };
};

export default SmplayerPlugin;
