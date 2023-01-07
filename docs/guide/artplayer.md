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

<script setup>
  const art0 = {
    url: "/assets/video/s_720.mp4",
  };
</script>
