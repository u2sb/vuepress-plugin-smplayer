---
title: ArtPlayer
---

## 介绍

可以插入 artplayer 标签。

## 配置

:::tip
一般情况下无需手动设置
:::

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import smplayer from "vuepress-plugin-smplayer";

export default defineUserConfig({
  plugins: [
    smplayer({
      artplayer: {
        width: "100%",
        ratio: 16 / 9,
        src: {
          fullscreen: true,
          autoSize: true,
          setting: true,
          whitelist: ["*"],
          //所有 artplayer 配置项都可以配置
        },
      },
    }),
  ],
});
```

## 使用

### 基本使用

<ClientOnly>
  <ArtPlayer :src="art0" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer :src="art0" />
</ClientOnly>

<script setup>
  const art0 = {
    url: "/assets/video/s_720.mp4",
  };
</script>
```

### HLS

<ClientOnly>
  <ArtPlayer :src="art1" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer :src="art1" />
</ClientOnly>

<script setup>
  const art1 = {
    url: "/assets/video/dash/master.m3u8",
  };
</script>
```

### FLV

<ClientOnly>
  <ArtPlayer :src="art2" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer :src="art2" />
</ClientOnly>

<script setup>
  const art2 = {
    url: "/assets/video/s_720.flv",
  };
</script>
```

### DASH

<ClientOnly>
  <ArtPlayer :src="art3" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer :src="art3" />
</ClientOnly>

<script setup>
  const art3 = {
    url: "/assets/video/dash/stream.mpd",
  };
</script>
```

### CustomType

<ClientOnly>
  <ArtPlayer :src="art4" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer :src="art4" />
</ClientOnly>

<script setup>
  const art4 = {
    url: "/assets/video/dash/master.m3u8",
    type: "customHLS",
    customType: {
      customHLS: async (mediaElement, src, player) => {
        if (
          mediaElement.canPlayType("application/x-mpegURL") ||
          mediaElement.canPlayType("application/vnd.apple.mpegURL")
        ) {
          mediaElement.src = src;
        } else {
          const { default: Hls } = await import("hls.js/dist/hls.min.js");
          // @ts-ignore
          const hls = new Hls();
          hls.attachMedia(mediaElement);
          hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(src);
          });

          player.on("destroy", function () {
            hls.destroy();
          });
        }
      },
    },
  };
</script>
```

### 弹幕

<ClientOnly>
  <ArtPlayer :src="art5" v-if="isDanmuOk"/>
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer :src="art5" v-if="isDanmuOk" />
</ClientOnly>

<script setup>
  import { onMounted , ref} from 'vue'
  let art5 = {};
  let isDanmuOk = ref(false);
  onMounted(async () => {
    const { default: artplayerPluginDanmuku } = await import(
      "artplayer-plugin-danmuku"
    );

    const danmakuId = "cENuyhsT2rMOCohK";
    const danmakuApi = "https://danmu.u2sb.com/api/artplayer/v1";
    const bilibiliDanmaku = `${danmakuApi}/bilibili/BV1zt411t79A.json`;
    art5 = {
      url: "/assets/video/s_720.mp4",
      plugins: [
        artplayerPluginDanmuku({
          danmuku: () =>
            Promise.allSettled([
              fetch(bilibiliDanmaku).then((res) => res.json()),
              fetch(`${danmakuApi}/${danmakuId}.json`).then((res) =>
                res.json()
              ),
            ])
              .then((res) =>
                res.filter((r) => r.status === "fulfilled").map((r) => r.value)
              )
              .then((res) =>
                res
                  .filter(
                    (r) =>
                      r["code"] !== undefined &&
                      r["code"] === 0 &&
                      r["data"] !== undefined &&
                      r["data"].length > 0
                  )
                  .reduce((acc, cur) => acc.concat(cur["data"]), [])
              ),
        }),
      ],
    };
    isDanmuOk.value = true;
  });
</script>
```

:::tip
插件暂时还不能注册事件，发送弹幕功能暂时还未能直接实现。
:::

<script setup>
  import { onMounted , ref} from 'vue'
  
  const art0 = {
    url: "/assets/video/s_720.mp4",
  };

  const art1 = {
    url: "/assets/video/dash/master.m3u8",
  };

  const art2 = {
    url: "/assets/video/s_720.flv",
  };

  const art3 = {
    url: "/assets/video/dash/stream.mpd",
  };

  const art4 = {
    url: "/assets/video/dash/master.m3u8",
    type: "customHLS",
    customType: {
      customHLS: async (mediaElement, src, player) => {
        if (
          mediaElement.canPlayType("application/x-mpegURL") ||
          mediaElement.canPlayType("application/vnd.apple.mpegURL")
        ) {
          mediaElement.src = src;
        } else {
          const { default: Hls } = await import("hls.js/dist/hls.min.js");
          // @ts-ignore
          const hls = new Hls();
          hls.attachMedia(mediaElement);
          hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(src);
          });

          player.on("destroy", function () {
            hls.destroy();
          });
        }
      },
    },
  };

  let art5 = {};
  let isDanmuOk = ref(false);
  onMounted(async () => {
    const { default: artplayerPluginDanmuku } = await import(
      "artplayer-plugin-danmuku"
    );

    const danmakuId = "cENuyhsT2rMOCohK";
    const danmakuApi = "https://danmu.u2sb.com/api/artplayer/v1";
    const bilibiliDanmaku = `${danmakuApi}/bilibili/BV1zt411t79A.json`;
    art5 = {
      url: "/assets/video/s_720.mp4",
      plugins: [
        artplayerPluginDanmuku({
          danmuku: () =>
            Promise.allSettled([
              fetch(bilibiliDanmaku).then((res) => res.json()),
              fetch(`${danmakuApi}/${danmakuId}.json`).then((res) =>
                res.json()
              ),
            ])
              .then((res) =>
                res.filter((r) => r.status === "fulfilled").map((r) => r.value)
              )
              .then((res) =>
                res
                  .filter(
                    (r) =>
                      r["code"] !== undefined &&
                      r["code"] === 0 &&
                      r["data"] !== undefined &&
                      r["data"].length > 0
                  )
                  .reduce((acc, cur) => acc.concat(cur["data"]), [])
              ),
        }),
      ],
    };
    isDanmuOk.value = true;
  });
</script>
