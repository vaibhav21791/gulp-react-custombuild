/**
 * @auther Vaibhav Ghorpade
 * @version 1.0.0.0
 * @description gulpfile.js to Copy files from React build to CRM Webresource structure format
 * @usage Run `gulp build` for development build. Run `gulp prod-build` for production build.
 */

var gulp = require("gulp");
var del = require("del");
var gulpif = require("gulp-if"); // npm i gulp-if
var rename = require("gulp-rename"); //npm i gulp-rename
/** JSON object to define build path and source path. Change according to the project folder structure */
var path = {
  devbuild: "build", // name of the React Build folder.
  dist: { js: "dist/scripts", css: "dist/styles" }, // name of the dist folder
};
/** Task to delete files from dist  folder */
gulp.task("clean-dist", function () {
  return del([path.dist.js, path.dist.css]);
});

/** Task to copy js files from build folder to dist folder */
gulp.task("copy-build-dist-js", function () {
  return gulp
    .src("build/static/js/*.*")
    .pipe(gulpif("2.*.chunk.js", rename("chunk.js")))
    .pipe(gulpif("2.*.chunk.js.map", rename("chunk.map.js")))
    .pipe(gulpif("main.*.chunk.js", rename("main.js")))
    .pipe(gulpif("main.*.chunk.js.map", rename("main.map.js")))
    .pipe(gulpif("runtime-main.*.js", rename("runtime.js")))
    .pipe(gulpif("runtime-main.*.js.map", rename("runtime.map.js")))
    .pipe(gulp.dest(path.dist.js));
 
});

/** Task to copy css files from build folder to dist folder */
gulp.task("copy-build-dist-css", function () {
  return gulp
    .src("build/static/css/*.css")
    .pipe(gulpif("2.*.chunk.css", rename("chunk.css")))
    .pipe(gulpif("main.*.chunk.css", rename("main.css")))
    .pipe(gulp.dest(path.dist.css));
});
/** production mode task */
gulp.task(
  "build",
  gulp.series("clean-dist", "copy-build-dist-js", "copy-build-dist-css")
);
