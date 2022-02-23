const { src, dest, series, parallel } = require("gulp");
const ts = require("gulp-typescript");
const rm = require("rimraf");
const replace = require("gulp-replace");
const { resolve } = require("path");
const { exec } = require("gulp-execa");

const outputDir = "./dist";
const tempDir = "./temp";
const inputDir = "./src";

const version = exec("git describe --tags", {
  shell: true,
  all: true,
}).stdout;

const cleanOut = (e) => rm(outputDir, e);
const cleanTemp = (e) => rm(tempDir, e);

const tsc = () => {
  const tsProject = ts.createProject("tsconfig.json");
  return tsProject.src().pipe(tsProject()).js.pipe(dest(tempDir));
};

const cpVue = () => src(resolve(inputDir, "**/*.vue")).pipe(dest(outputDir));
const cpCss = () => src(resolve(inputDir, "**/*.css")).pipe(dest(outputDir));
const cpPackageJson = () => {
  console.log(version);
  return src(resolve(inputDir, "package.json")).pipe(dest(outputDir));
};

const cpTempJs = () =>
  src(resolve(tempDir, "**/*.js"))
    .pipe(replace("export {};", ""))
    .pipe(dest(outputDir));
exports.build = series(
  cleanOut,
  cleanTemp,
  tsc,
  cpTempJs,
  cpVue,
  cpCss,
  cleanTemp
);
