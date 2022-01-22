const { src, dest, series } = require("gulp");
const rm = require("rimraf");
const jeditor = require("gulp-json-editor");
const { resolve } = require("path");
const execa = require("execa");

const outputDir = "./dist";
const inputDir = "./src";

const version = execa.commandSync("git describe --tags", {
  shell: true,
  all: true,
}).stdout;

const cleanOut = (e) => rm(outputDir, e);

const cpVue = () => src(resolve(inputDir, "**/*.vue")).pipe(dest(outputDir));
const cpCss = () => src(resolve(inputDir, "**/*.css")).pipe(dest(outputDir));

const cpPackageJson = () => {
  return src("package.json")
    .pipe(
      jeditor({
        version: version,
      })
    )
    .pipe(src("readme.md"))
    .pipe(src("LICENSE"))
    .pipe(dest(outputDir));
};

const cpJs = () => src(resolve(inputDir, "**/*.js")).pipe(dest(outputDir));

const build = series(
  cleanOut,
  cpVue,
  cpCss,
  cpPackageJson,
  cpJs,
);

exports.build = build;
