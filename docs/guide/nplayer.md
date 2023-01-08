---
title: NPlayer
---

## 介绍

可以插入 nplayer 播放器。

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
      nplayer: {
        width: "100%",
        ratio: 16 / 9,
        src: {
          //所有 nplayer 配置项都可以配置
        },
      },
    }),
  ],
});
```

## 使用

### 基本使用

<ClientOnly>
  <NPlayer :src="src0" />
</ClientOnly>

```html
<ClientOnly>
  <NPlayer :src="src0" />
</ClientOnly>

<script setup>
  const src0 = {
    src: "/assets/video/s_720.mp4",
  };
</script>
```

### HLS

<ClientOnly>
  <NPlayer :src="src1" />
</ClientOnly>

```html
<ClientOnly>
  <NPlayer :src="src1" />
</ClientOnly>

<script setup>
  const src1 = {
    src: "/assets/video/dash/master.m3u8",
  };
</script>
```

### FLV

<ClientOnly>
  <NPlayer :src="src2" />
</ClientOnly>

```html
<ClientOnly>
  <NPlayer :src="src2" />
</ClientOnly>

<script setup>
  const src2 = {
    url: "/assets/video/s_720.flv",
  };
</script>
```

### DASH

<ClientOnly>
  <NPlayer :src="src3" />
</ClientOnly>

```html
<ClientOnly>
  <NPlayer :src="src3" />
</ClientOnly>

<script setup>
  const src3 = {
    url: "/assets/video/dash/stream.mpd",
  };
</script>
```

<script setup>
  const src0 = {
    src: "/assets/video/s_720.mp4",
  };
  const src1 = {
    src: "/assets/video/dash/master.m3u8",
  };
  const src2 = {
    src: "/assets/video/s_720.flv",
  };
  const src3 = {
    src: "/assets/video/dash/stream.mpd",
  };
</script>
