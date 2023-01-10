---
title: ArtPlayer
---

## 介绍

可以插入 artplayer 播放器。

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
  <ArtPlayer url="/assets/video/s_720.mp4" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer url="/assets/video/s_720.mp4" />
</ClientOnly>
```

### HLS

<ClientOnly>
  <ArtPlayer url="/assets/video/dash/master.m3u8" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer url="/assets/video/dash/master.m3u8" />
</ClientOnly>
```

### FLV

<ClientOnly>
  <ArtPlayer url="/assets/video/s_720.flv" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer url="/assets/video/s_720.flv" />
</ClientOnly>
```

### DASH

<ClientOnly>
  <ArtPlayer url="/assets/video/dash/stream.mpd" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer url="/assets/video/dash/stream.mpd" />
</ClientOnly>
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
  <ArtPlayer url="/assets/video/s_720.mp4" :player="player5" :pluginDanmuKu="danmu5" />
</ClientOnly>

```html
<ClientOnly>
  <ArtPlayer url="/assets/video/s_720.mp4" :player="player5" :pluginDanmuKu="danmu5" />
</ClientOnly>

<script setup>
  const danmakuId = "cENuyhsT2rMOCohK";
  const danmakuApi = "https://danmu.u2sb.com/api/artplayer/v1";
  const bilibiliDanmaku = `${danmakuApi}/bilibili/BV1zt411t79A.json`;

  const danmu5 = {
    danmuku: () =>
      Promise.allSettled([
        fetch(bilibiliDanmaku).then((res) => res.json()),
        fetch(`${danmakuApi}/${danmakuId}.json`).then((res) => res.json()),
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
  };
  const player5 = (player) => {
    player.on("artplayerPluginDanmuku:emit", (danmu) => {
      console.log(danmu);
      fetch(danmakuApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Id: danmakuId,
          Referer: window.location.origin + window.location.pathname,
          ...danmu,
        }),
      });
    });
  };
</script>
```

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

  const danmakuId = "cENuyhsT2rMOCohK";
  const danmakuApi = "https://danmu.u2sb.com/api/artplayer/v1";
  const bilibiliDanmaku = `${danmakuApi}/bilibili/BV1zt411t79A.json`;

  const danmu5 = {
    danmuku: () =>
      Promise.allSettled([
        fetch(bilibiliDanmaku).then((res) => res.json()),
        fetch(`${danmakuApi}/${danmakuId}.json`).then((res) => res.json()),
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
  };
  const player5 = (player) => {
    player.on("artplayerPluginDanmuku:emit", (danmu) => {
      console.log(danmu);
      fetch(danmakuApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Id: danmakuId,
          Referer: window.location.origin + window.location.pathname,
          ...danmu,
        }),
      });
    });
  };
</script>
