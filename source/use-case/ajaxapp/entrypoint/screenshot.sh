#!/usr/bin/env bash

declare projectDir=$(git rev-parse --show-toplevel);
declare currentDir=$(pwd)
declare screenshotDevTools="${projectDir}/tools/applescript/lib/src/screenshot-dev-tools.js";
declare screenshot="${projectDir}/tools/applescript/lib/src/screenshot.js";
declare launchFirefox="${projectDir}/tools/applescript/lib/src/launch-firefox.js";
declare screenshotOnly="${projectDir}/tools/applescript/lib/src/screenshot-only.js";
# マニュアル操作が必要なもの
mkdir -p "${currentDir}/img/"
# server 起動
npx -q @js-primer/local-server src/ &
serverPID=$!
echo $serverPID;
# screenshot
npx -q wait-on http://localhost:3000 \
&& node "${screenshotDevTools}" --url "http://localhost:3000/" --output "${currentDir}/img/fig-1.png"
# server 終了
function finish {
  echo "Shutting down the server..."
  kill $serverPID
}
trap finish INT KILL TERM EXIT