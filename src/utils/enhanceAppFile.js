import Bilibili from "../components/Bilibili.vue";
import Xigua from "../components/Xigua.vue";
import DPlayer from "../components/DPlayer.vue";
import APlayer from "../components/APlayer.vue";
import Artplayer from "../components/Artplayer.vue";

export default ({ Vue }) => {
  Vue.component("Bilibili", Bilibili);
  Vue.component("Xigua", Xigua);
  Vue.component("DPlayer", DPlayer);
  Vue.component("APlayer", APlayer);
  Vue.component("Artplayer", Artplayer);
};
