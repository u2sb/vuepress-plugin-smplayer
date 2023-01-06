import { defineClientConfig } from "@vuepress/client";

import bilibili from "./components/Bilibili/bilibili.js";
import xigua from "./components/Xigua/xigua.js";
import aplayer from "./components/APlayer/aplayer.js";
import meting from "./components/Meting/meting.js";

export default defineClientConfig({
  async enhance({ app }) {
    app.component("Bilibili", bilibili);
    app.component("Xigua", xigua);
    app.component("APlayer", aplayer);
    app.component("Meting", meting);
    app.component("MetingJs", meting);
  },
});
