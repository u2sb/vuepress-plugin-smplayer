---
title: 安装
---

## 安装

:::tip
目前 2.x 正式版还未发布，安装和更新需手动指定版本。
:::

运行

::: code-tabs

@tab:active pnpm

```bash
pnpm add -D vuepress-plugin-smplayer@2.0.0-beta.13
```

@tab yarn

```bash
yarn add -D vuepress-plugin-smplayer@2.0.0-beta.13
```

@tab npm

```bash
npm i -D vuepress-plugin-smplayer@2.0.0-beta.13
```

:::

## 配置

::: code-tabs

@tab TS

```ts {3,7-9}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import smplayer from "vuepress-plugin-smplayer";

export default defineUserConfig({
  plugins: [
    smplayer({
      // 配置项
    }),
  ],
});
```

@tab JS

```js {2,6-8}
// .vuepress/config.js
import smplayer from "vuepress-plugin-smplayer";

export default {
  plugins: [
    smplayer({
      // 配置项
    }),
  ],
};
```

:::

## 建议

- 建议配置 `shouldPrefetch: false`

## 反馈

[GitHub](https://github.com/u2sb/vuepress-plugin-smplayer/issues)
