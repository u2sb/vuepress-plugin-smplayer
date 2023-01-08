import { defineClientConfig } from "@vuepress/client";

import bilibili from "./components/Bilibili/bilibili.js";
import xigua from "./components/Xigua/xigua.js";
import artplayer from "./components/ArtPlayer/artplayer.js";
import vue3AudioPlayer from "./components/Vue3AudioPlayer/audioPlayer.js";

export default defineClientConfig({
  async enhance({ app }) {
    app.component("Bilibili", bilibili);
    app.component("Xigua", xigua);
    app.component("ArtPlayer", artplayer);
    app.component("Vue3AudioPlayer", vue3AudioPlayer);
    app.component("vue3-audio-player", vue3AudioPlayer);
    app.component("AudioPlayer", vue3AudioPlayer);
  },
});
