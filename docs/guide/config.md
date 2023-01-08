---
title: 配置
---

:::tip
正常情况下本页不需要看，有默认项配置需要的再来看。
:::

配置项比较复杂，如果想要完全了解，建议查看[源码](https://github.com/u2sb/vuepress-plugin-smplayer/tree/v2)。

所有项目均为可选项，配置就会覆盖默认配置，所以不懂的就不要写。

## 结构

以下讲解全部以 TS 为例

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import smplayer from "vuepress-plugin-smplayer";

export default defineUserConfig({
  plugins: [
    smplayer({
      bilibili: {
        danmaku: true,
        width: "100%",
        ratio: 16 / 9,
      },
      xigua: {
        autoplay: false,
        width: "100%",
        ratio: 16 / 9,
      },
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
