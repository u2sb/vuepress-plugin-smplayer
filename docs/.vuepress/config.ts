import { defineUserConfig } from "vuepress";
import { defaultTheme } from "vuepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import smplayer from "vuepress-plugin-smplayer";
import wxshare from "./wxshare/node";

export default defineUserConfig({
  lang: "zh-CN",
  title: "smplayer",
  description: "vuepress-plugins-smplayer",
  dest: "dist",
  shouldPrefetch: false,
  shouldPreload: false,
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.png",
      },
    ],
  ],
  theme: defaultTheme({
    colorMode: "dark",
    colorModeSwitch: false,
    logo: "/assets/img/smlogo1.png",
    repo: "u2sb/vuepress-plugin-smplayer",
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          children: ["/guide/README.md", "/guide/install.md"],
        },
      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "指南",
        link: "/guide/",
      },
      {
        text: "其他项目",
        link: "https://www.u2sb.com",
      },
    ],
  }),
  plugins: [
    mdEnhancePlugin({
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imgSize: true,
      include: true,
      katex: true,
      imgLazyload: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    }),
    searchProPlugin({
      indexContent: true,
    }),
    shikiPlugin({
      theme: "one-dark-pro",
    }),
    smplayer({}),
    wxshare({
      host: "https://smplayer.u2sb.com",
      redirectApi: "https://wx.xxwhite.com/wxshare/",
      imgUrl: "https://smplayer.u2sb.com/assets/img/smlogo2.png",
    }),
  ],
});
