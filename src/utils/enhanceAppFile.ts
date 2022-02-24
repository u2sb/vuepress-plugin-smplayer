import { EnhanceApp } from "vuepress-types";

import Bilibili from "../components/Bilibili/BilibiliComponent";
import Xigua from "../components/Xigua/XiguaComponent";
import DPlayer from "../components/Dplayer/DplayerComponent";
import APlayer from "../components/Aplayer/AplayerComponent";
import APlayerGlobal from "../components/Aplayer/AplayerGlobalComponent";
import Artplayer from "../components/Artplayer/ArtplayerComponent";
import Meting from "../components/Meting/MetingComponent";
import Xgplayer from "../components/Xgplayer/XgplayerComponent";

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
