#!/usr/bin/env bash

declare projectDir=$(git rev-parse --show-toplevel);
# 基本文法
node "${projectDir}/tools/generate-summary.js" --index "${projectDir}/source/basic/README.md" --pattern  "${projectDir}/source/basic/"
# ajaxapp
node "${projectDir}/tools/generate-summary.js" --index "${projectDir}/source/use-case/ajaxapp/README.md" --pattern  "${projectDir}/source/use-case/ajaxapp/"
# nodecli
node "${projectDir}/tools/generate-summary.js" --index "${projectDir}/source/use-case/nodecli/README.md" --pattern  "${projectDir}/source/use-case/nodecli/"
# todoapp
node "${projectDir}/tools/generate-summary.js" --index "${projectDir}/source/use-case/todoapp/README.md" --pattern  "${projectDir}/source/use-case/todoapp/"
