---
title: APlayer
---

## 介绍

可以插入 aplayer 标签

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
      aplayer: {
        src: {
          lrcType: 3,
          // 所有 aplayer 配置项都可以在这配置
        },
      },
    }),
  ],
});
```

## 使用

### 基本使用

<ClientOnly>
  <APlayer :src="aplayer1" />
</ClientOnly>

```html
<ClientOnly>
  <APlayer :src="aplayer1" />
</ClientOnly>

<script setup>
  const aplayer1 = {
    audio: [
      {
        name: "年轻人要热爱祖国",
        artist: "音阙诗听/赵方婧",
        url: "/assets/audio/年轻人要热爱祖国.mp3",
        cover:
          "https://sm.sm9.top/api/music?server=Tencent&type=pic&id=001gv6xI4BNGiP",
        lrc: "/assets/audio/年轻人要热爱祖国.lrc",
      },
    ],
  };
</script>
```

<script setup>
  const aplayer1 = {
    audio: [
      {
        name: "年轻人要热爱祖国",
        artist: "音阙诗听/赵方婧",
        url: "/assets/audio/年轻人要热爱祖国.mp3",
        cover:
          "https://sm.sm9.top/api/music?server=Tencent&type=pic&id=001gv6xI4BNGiP",
        lrc: "/assets/audio/年轻人要热爱祖国.lrc",
      },
    ],
  };
</script>
