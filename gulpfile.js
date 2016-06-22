"use strict";
const gulp = require("gulp");
const gutil = require('gulp-util');
const path = require("path");
const textlint = require('gulp-textlint');
const toDoc = require("power-doctest");
const strictEval = require("strict-eval");
const remark = require("remark")();
const select = require('unist-util-select');
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

/**
 * Markdownファイルの CodeBlock に対してdoctestを行う
 * CodeBlockは必ず実行できるとは限らないので、
 * AssertionError(doctestにおける失敗)以外は成功したことにして無視する
 */
gulp.task('test:doc-code', function () {
    return gulp.src('./source/**/**.md')
        .on('error', function (error) {
            console.error(error);
        })
        .pipe(new Transform({
            writableObjectMode: true,
            readableObjectMode: true,
            transform: function (file, encoding, next) {
                const markdownAST = remark.parse(String(file.contents));
                const codeBlocks = [].concat(select(markdownAST, 'code[lang="js"]'), select(markdownAST, 'code[lang="javascript"]'));
                const codes = codeBlocks.map(codeBlock => {
                    var code = "";
                    try {
                        code = toDoc.convertCode(codeBlock.value, file.path);
                    } catch (error) {
                    }
                    return code;
                });
                codes.forEach(code => {
                    try {
                        strictEval(code);
                    } catch (error) {
                        // AssertionError以外は無視する
                        if (error.name !== "AssertionError") {
                            return;
                        }
                        console.error(file.path);
                        throw error;
                    }
                });
                gutil.log(gutil.colors.green('✔'), "Pass", file.path);
                next();
            }
        }))
});

/**
 * *-example.js を実行しdoctestを行う
 * a // => "aの評価結果"
 * が一致するかのdoctestを行う
 */
gulp.task('test:example', function () {
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
                    throw error;
                }
                gutil.log(gutil.colors.green('✔'), "Pass", file.path);
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