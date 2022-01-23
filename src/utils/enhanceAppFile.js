import Bilibili from "../components/Bilibili";
import Xigua from "../components/Xigua";
import DPlayer from "../components/DPlayer";
import APlayer from "../components/APlayer";
import Artplayer from "../components/Artplayer";
import Meting from "../components/Meting";

export default ({ Vue }) => {
  Vue.component("Bilibili", Bilibili);
  Vue.component("Xigua", Xigua);
  Vue.component("DPlayer", DPlayer);
  Vue.component("APlayer", APlayer);
  Vue.component("Artplayer", Artplayer);
  Vue.component("Meting", Meting);
};
