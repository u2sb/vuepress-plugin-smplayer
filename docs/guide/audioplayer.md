---
title: AudioPlayer
---

## 介绍

插入 [vue3-audio-player](https://github.com/RealCoolSnow/vue3-audio-player) 播放器

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
      vue3AudioPlayer: {
        src: {
          coverRotate: true,
          progressBarColor: "#3C91F4",
          indicatorColor: "#3C91F4",
        },
      },
    }),
  ],
});
```

:::tip
如使用 `plugin-medium-zoom` 会与此功能产生一定冲突，需将此插件内的图片排除在外，详见[文档](https://v2.vuepress.vuejs.org/zh/reference/plugin/medium-zoom.html)

```ts
mediumZoomPlugin({
      selector: ":not(a) > img :not(.audio__player)",
    }),
```

:::

## 使用

<AudioPlayer :src="src1" />

```html
<AudioPlayer :src="src1" />

<script setup>
  const src1 = {
    src: "/assets/audio/年轻人要热爱祖国.mp3",
    title: "年轻人要热爱祖国",
    coverImage:
      "https://sm.sm9.top/api/music?server=Tencent&type=pic&id=001gv6xI4BNGiP",
    coverRotate: true,
  };
</script>
```

<script setup>
  const src1 = {
    src: "/assets/audio/年轻人要热爱祖国.mp3",
    title:"年轻人要热爱祖国",
    coverImage: "https://sm.sm9.top/api/music?server=Tencent&type=pic&id=001gv6xI4BNGiP",
    coverRotate: true
  }
</script>
