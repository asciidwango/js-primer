"use strict";
var gulp = require("gulp");
var path = require("path");
var textlint = require('gulp-textlint');
gulp.task('textlint', function () {
    return gulp.src('./source/**/*.md')
        .on('error', function(error){
            console.error(error);
        })
        .pipe(textlint({
            formatterName: "pretty-error"
        }))
});