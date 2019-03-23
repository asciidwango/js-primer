#!/usr/bin/env bash

declare projectDir=$(git rev-parse --show-toplevel);
# 基本文法
node "${projectDir}/tools/generate-summary.js" --index "${projectDir}/source/basic/README.md" --pattern "**/basic/**/README.md"
# ユースケース
node "${projectDir}/tools/generate-summary.js" --index "${projectDir}/source/use-case/README.md" --pattern "**/use-case/*/README.md"
# ajaxapp
node "${projectDir}/tools/generate-summary.js" --index "${projectDir}/source/use-case/ajaxapp/README.md" --pattern "**/use-case/ajaxapp/**/README.md"
# nodecli
node "${projectDir}/tools/generate-summary.js" --index "${projectDir}/source/use-case/nodecli/README.md" --pattern "**/use-case/nodecli/**/README.md"
# todoapp
node "${projectDir}/tools/generate-summary.js" --index "${projectDir}/source/use-case/todoapp/README.md" --pattern "**/use-case/todoapp/**/README.md"
