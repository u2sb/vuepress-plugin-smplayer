import Bilibili from "../components/Bilibili.vue";
import Xigua from "../components/Xigua.vue";
import DPlayer from "../components/DPlayer.vue";
import APlayer from "../components/APlayer.vue";
import APlayerGlobal from "../components/APlayerGlobal.vue";
import Artplayer from "../components/Artplayer.vue";
import Meting from "../components/Meting.vue";

export default ({ Vue }) => {
  Vue.component("Bilibili", Bilibili);
  Vue.component("Xigua", Xigua);
  Vue.component("DPlayer", DPlayer);
  Vue.component("APlayer", APlayer);
  Vue.component("APlayerGlobal", APlayerGlobal);
  Vue.component("Artplayer", Artplayer);
  Vue.component("Meting", Meting);
  Vue.component("meting-js", Meting);
};
