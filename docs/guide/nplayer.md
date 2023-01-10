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

<NPlayer url="/assets/video/s_720.mp4" />

```html
<NPlayer url="/assets/video/s_720.mp4" />
```

### HLS

<NPlayer url="/assets/video/dash/master.m3u8" />

```html
<NPlayer url="/assets/video/dash/master.m3u8" />
```

### FLV

<NPlayer url="/assets/video/s_720.flv" />

```html
<NPlayer url="/assets/video/s_720.flv" />
```

### DASH

<NPlayer url="/assets/video/dash/stream.mpd" />

```html
<NPlayer url="/assets/video/dash/stream.mpd" />
```

### 高级

其他设置可通过 `src` 选项配置

```html
<NPlayer :src="src" />

<script setup>
  const src = {
    url: "/assets/video/dash/stream.mpd",
    // 其他 nplayer 配置项
  };
</script>
```
