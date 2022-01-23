import Bilibili from "../components/Bilibili";
import Xigua from "../components/Xigua";
import DPlayer from "../components/DPlayer";

export default ({ Vue }) => {
  Vue.component("Bilibili", Bilibili);
  Vue.component("Xigua", Xigua);
  Vue.component("DPlayer", DPlayer)
};
