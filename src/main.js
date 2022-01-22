import { resolve } from "path";

module.exports = (option = {}, context) => ({
  name: "vuepress-plugin-mmedia",
  enhanceAppFiles: [resolve(__dirname, "utils/", "enhanceAppFile.js")],
});
