import { Plugin } from "vuepress-types";
import { Config } from "./type/Config";

const { resolve } = require("path");
const merge = require("deepmerge");
const config_default = require("./config/config_default");

const SbMediaPlugin: Plugin<Config> = (opts, context) => ({
  define() {
    const config = merge(config_default, opts);
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

module.exports = SbMediaPlugin;
