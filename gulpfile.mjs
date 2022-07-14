import gulp from "gulp";
import rm from "rimraf";
import jeditor from "gulp-json-editor";
import { resolve } from "path";
import { execaCommandSync } from "execa";
import ts from "gulp-typescript";

const outputDir = "./dist";
const inputDir = "./src";

const { src, dest, series } = gulp;

const version = execaCommandSync("git describe --tags", {
  shell: true,
  all: true,
}).stdout;

const tsc = () => {
  const tsProject = ts.createProject("tsconfig.json");
  return tsProject.src().pipe(tsProject()).pipe(dest(outputDir));
};

const cleanOut = (e) => rm(outputDir, e);
const cpVue = () => src(resolve(inputDir, "**/*.vue")).pipe(dest(outputDir));
const cpCss = () => src(resolve(inputDir, "**/*.css")).pipe(dest(outputDir));
const cpJs = () => src(resolve(inputDir, "**/*.js")).pipe(dest(outputDir));

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

export const build = series(cleanOut, tsc, cpVue, cpCss, cpJs, cpPackageJson);
