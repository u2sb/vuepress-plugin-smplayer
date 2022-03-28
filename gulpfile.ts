const { src, dest, series, parallel } = require("gulp");
const ts = require("gulp-typescript");
const rm = require("rimraf");
const replace = require("gulp-replace");
const { resolve } = require("path");
const execa = require("execa");

const outputDir = "./dist";
const tempDir = "./temp";
const inputDir = "./src";

const version = execa.commandSync("git describe --tags", {
  shell: true,
  all: true,
}).stdout;

const cleanOut = (e: void) => rm(outputDir, e);
const cleanTemp = (e: void) => rm(tempDir, e);

const tsc = () => {
  const tsProject = ts.createProject("tsconfig.json");
  return tsProject.src().pipe(tsProject()).pipe(dest(tempDir));
};

const cpVue = () => src(resolve(inputDir, "**/*.vue")).pipe(dest(outputDir));
const cpCss = () => src(resolve(inputDir, "**/*.css")).pipe(dest(outputDir));

const cpPackageJson = () => {
  return src("package.json")
    .pipe(replace("vuepress-plugin-smplayer-version", version))
    .pipe(src("readme.md"))
    .pipe(src("LICENSE"))
    .pipe(dest(outputDir));
};

const cpTempJs = () =>
  src(resolve(tempDir, "**/*.js"))
    .pipe(replace("export {};", ""))
    .pipe(src(resolve(tempDir, "**/*.d.ts")))
    .pipe(dest(outputDir));

const cpJs = () => src(resolve(inputDir, "**/*.js")).pipe(dest(outputDir));

const build = series(
  cleanTemp,
  tsc,
  cleanOut,
  cpTempJs,
  cpVue,
  cpCss,
  cpPackageJson,
  cpJs,
  cleanTemp
);

exports.build = build;
