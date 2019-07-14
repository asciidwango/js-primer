#!/usr/bin/env bash

declare projectDir=$(git rev-parse --show-toplevel);
declare currentDir=$(pwd)
declare screenshotDevTools="${projectDir}/tools/applescript/lib/src/screenshot-dev-tools.js";
declare screenshot="${projectDir}/tools/applescript/lib/src/screenshot.js";
declare launchFirefox="${projectDir}/tools/applescript/lib/src/launch-firefox.js";
declare screenshotOnly="${projectDir}/tools/applescript/lib/src/screenshot-only.js";
# cd src && npx @js-primer/local-server
# を事前に実行する
# setup
mkdir -p "${currentDir}/img/"
# screenshot
node "${launchFirefox}" --devTools --url "http://localhost:3000/"
node "${screenshotOnly}" --output "${currentDir}/img/index.png"
