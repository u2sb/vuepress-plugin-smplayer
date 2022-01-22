import { defineClientConfig } from '@vuepress/client'
import { defineAsyncComponent } from "vue";

import Bilibili from "../components/bilibili/Bilibili.vue";
import Xigua from "../components/xigua/Xigua.vue";

export default defineClientConfig({
  async enhance({ app }) {
    app.component("Bilibili", Bilibili);
    app.component("Xigua", Xigua);

    app.component(
      "APlayer",
      defineAsyncComponent(
        () => import("../components/aplayer/APlayer.vue")
      )
    );

    app.component(
      "DPlayer",
      defineAsyncComponent(
        () => import("../components/dplayer/DPlayer.vue")
      )
    );

    app.component(
      "ArtPlayer",
      defineAsyncComponent(
        () => import("../components/artplayer/ArtPlayer.vue")
      )
    );

    app.component(
      "Meting",
      defineAsyncComponent(
        () => import("../components/meting/Meting.vue")
      )
    );

    app.component(
      "MetingJS",
      defineAsyncComponent(
        () => import("../components/meting/Meting.vue")
      )
    );
  },
})
