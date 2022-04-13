import { defineClientAppEnhance } from "@vuepress/client";
import { defineAsyncComponent } from "vue";

import Bilibili from "../components/Bilibili/BilibiliComponent";
import Xigua from "../components/Xigua/XiguaComponent";

declare const __VUEPRESS_SSR__: boolean;

export default defineClientAppEnhance(({ app }) => {
  app.component("Bilibili", Bilibili);
  app.component("Xigua", Xigua);

  if (!__VUEPRESS_SSR__) {
    app.component(
      "APlayer",
      defineAsyncComponent(
        () => import("../components/Aplayer/AplayerComponent")
      )
    );
    app.component(
      "DPlayer",
      defineAsyncComponent(
        () => import("../components/Dplayer/DplayerComponent")
      )
    );
    app.component(
      "Meting",
      defineAsyncComponent(() => import("../components/Meting/MetingComponent"))
    );
    app.component(
      "MetingJs",
      defineAsyncComponent(() => import("../components/Meting/MetingComponent"))
    );
    app.component(
      "Artplayer",
      defineAsyncComponent(
        () => import("../components/Artplayer/ArtplayerComponent")
      )
    );
    app.component(
      "Xgplayer",
      defineAsyncComponent(
        () => import("../components/Xgplayer/XgplayerComponent")
      )
    );
  }
});
