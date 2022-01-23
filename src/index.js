import { resolve } from "path";
import merge from "deepmerge";
import config_default from "./config/config_default";

module.exports = (opts, context) => ({
  define() {
    const config = merge(config_default, opts);
    return {
      APLAYER: config.aplayer,
      METING: config.meting,
      DPLAYER: config.dplayer,
      ARTPLAYER: config.artplayer,
      BILIBILI: config.bilibili,
      XIGUA: config.xigua,
    };
  },
  enhanceAppFiles: resolve(__dirname, "utils/", "enhanceAppFile.js"),
});
