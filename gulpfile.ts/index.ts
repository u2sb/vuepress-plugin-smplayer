const { src, dest, series, parallel } = require("gulp");
const rename = require("gulp-rename");
const ts = require("gulp-typescript");
const rm = require("rimraf");
const jeditor = require("gulp-json-editor");
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

const tsc1 = () => {
  const tsProject = ts.createProject("tsconfig.json");
  return src(resolve(inputDir, "index.ts"))
    .pipe(tsProject())
    .pipe(dest(tempDir));
};

const tsc2 = () => {
  const tsProject = ts.createProject("tsconfig.json", { module: "commonjs" });
  return src(resolve(inputDir, "index.ts"))
    .pipe(replace("export default", "module.exports ="))
    .pipe(tsProject())
    .pipe(
      rename({
        extname: ".cjs",
      })
    )
    .pipe(dest(tempDir));
};

const cpVue = () => src(resolve(inputDir, "**/*.vue")).pipe(dest(outputDir));
const cpCss = () => src(resolve(inputDir, "**/*.css")).pipe(dest(outputDir));

const cpPackageJson = () => {
  return src("package.json")
    .pipe(
      jeditor({
        version: version,
        type: "module",
        main: "index.cjs",
        module: "index.js",
        exports: {
          import: "./index.js",
          require: "./index.cjs",
        },
        types: "./index.d.ts",
      })
    )
    .pipe(src("readme.md"))
    .pipe(src("LICENSE"))
    .pipe(dest(outputDir));
};

const cpTempJs = () =>
  src([
    resolve(tempDir, "**/*.js"),
    resolve(tempDir, "**/*.d.ts"),
    resolve(tempDir, "**/*.mjs"),
    resolve(tempDir, "**/*.cjs"),
  ]).pipe(dest(outputDir));

const cpJs = () => src(resolve(inputDir, "**/*.js")).pipe(dest(outputDir));

const build = series(
  cleanTemp,
  tsc,
  tsc1,
  tsc2,
  cleanOut,
  cpTempJs,
  cpVue,
  cpCss,
  cpPackageJson,
  cpJs,
  cleanTemp
);

exports.build = build;
