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
  vue3AudioPlayer: {},
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
            "aplayer/dist/APlayer.min.js",
            "artplayer/dist/artplayer.js",
            "hls.js/dist/hls.min.js",
            "mpegts.js/dist/mpegts.js",
            "dashjs/dist/dash.all.min.js",
          ],
        };
      }
    },
  };
};

export default SmplayerPlugin;
