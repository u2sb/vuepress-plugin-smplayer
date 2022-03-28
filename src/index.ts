import { Plugin } from "vuepress-types";
import { Config as SmPlayerPluginOption } from "./types";

const { resolve } = require("path");
const { deepmerge } = require("deepmerge-ts");
const config_default = require("./config/ConfigDefault.cjs.js");

const smplayerPlugin: Plugin<SmPlayerPluginOption> = (opts) => ({
  define() {
    const config = deepmerge(config_default, opts);
    return {
      APLAYER: config.aplayer,
      METING: config.meting,
      DPLAYER: config.dplayer,
      ARTPLAYER: config.artplayer,
      BILIBILI: config.bilibili,
      XIGUA: config.xigua,
      XGPLAYER: config.xgplayer,
    };
  },
  enhanceAppFiles: resolve(__dirname, "utils/", "enhanceAppFile.js"),
});

module.exports = smplayerPlugin;
