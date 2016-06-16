"use strict";
var gulp = require("gulp");
var path = require("path");
var textlint = require('gulp-textlint');
var toDoc = require("power-doctest");
const strictEval = require("strict-eval");
const Transform = require("stream").Transform;
const gulpPowerDoc = function () {
    return new Transform({
        writableObjectMode: true,
        readableObjectMode: true,
        transform: function (file, encoding, next) {
            if (file.isBuffer()) {
                file.contents = Buffer(toDoc.convertCode(String(file.contents), file.path));
            }

            if (file.isStream()) {
                throw new Error("not support");
            }
            this.push(file);
            next();
        }
    });
};

gulp.task('doc-test', function () {
    return gulp.src('./source/**/*-example.js')
        .on('error', function (error) {
            console.error(error);
        })
        .pipe(gulpPowerDoc())
        // eval
        .pipe(new Transform({
            writableObjectMode: true,
            readableObjectMode: true,
            transform: function (file, encoding, next) {
                try {
                    strictEval(String(file.contents));
                } catch (error) {
                    console.error(file.path);
                    console.error(error.stack);
                }
                next();
            }
        }))
});
gulp.task('textlint', function () {
    return gulp.src('./source/**/*.md')
        .on('error', function (error) {
            console.error(error);
        })
        .pipe(textlint({
            formatterName: "pretty-error"
        }))
});