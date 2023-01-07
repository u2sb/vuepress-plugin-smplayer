import { getDirname, path } from "@vuepress/utils";
import type { PluginObject } from "@vuepress/core";

const __dirname = getDirname(import.meta.url);

export interface WxSharePluginOptions {
  host: string;
  redirectApi?: string;
  imgUrl?: string;
  desc?: string;
  signatureApi?: string;
  directConnection?: boolean;
}

const WxSharePlugin = (options: WxSharePluginOptions): PluginObject => {
  return {
    name: "vuepress-plugin-wxshare",
    define: {
      WSPO: options,
    },
    clientConfigFile: path.resolve(__dirname, "../client/client.ts"),
  };
};

export default WxSharePlugin;
