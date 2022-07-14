import { defineClientConfig } from "@vuepress/client";

import Bilibili from "./components/Bilibili/bilibili.js";
import Xigua from "./components/Xigua/xigua.js";

export default defineClientConfig({
  async enhance({ app }) {
    app.component("Bilibili", Bilibili);
    app.component("Xigua", Xigua);
  },
});
