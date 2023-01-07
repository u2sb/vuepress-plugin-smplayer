import { defineClientConfig } from "@vuepress/client";
import wxshare from "./components/wxshare";

export default defineClientConfig({
  rootComponents: [wxshare],
});
