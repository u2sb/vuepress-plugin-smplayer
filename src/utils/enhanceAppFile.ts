import { EnhanceApp } from "vuepress-types";

import Bilibili from "../components/Bilibili/Bilibili.vue";
import Xigua from "../components/Xigua/Xigua.vue";
import DPlayer from "../components/Dplayer/DPlayer.vue";
import APlayer from "../components/Aplayer/APlayer.vue";
import APlayerGlobal from "../components/Aplayer/APlayerGlobal.vue";
import Artplayer from "../components/Artplayer/Artplayer.vue";
import Meting from "../components/Meting/Meting.vue";
import Xgplayer from "../components/Xgplayer/Xgplayer.vue";

const enhanceAppFile: EnhanceApp = ({ Vue }): void => {
  Vue.component("Bilibili", Bilibili);
  Vue.component("Xigua", Xigua);
  Vue.component("DPlayer", DPlayer);
  Vue.component("APlayer", APlayer);
  Vue.component("APlayerGlobal", APlayerGlobal);
  Vue.component("Artplayer", Artplayer);
  Vue.component("Meting", Meting);
  Vue.component("meting-js", Meting);
  Vue.component("Xgplayer", Xgplayer);
};

export default enhanceAppFile;
