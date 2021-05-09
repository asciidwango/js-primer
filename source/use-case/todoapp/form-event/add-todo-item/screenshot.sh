#!/usr/bin/env bash

declare projectDir=$(git rev-parse --show-toplevel);
declare todoappDir="${projectDir}/source/use-case/todoapp"
declare currentSectionDir="${todoappDir}/form-event"
declare currentDir="${todoappDir}/form-event/add-todo-item"
declare screenshot="${projectDir}/tools/applescript/lib/src/screenshot.js";
declare screenshotDevTools="${projectDir}/tools/applescript/lib/src/screenshot-dev-tools.js";
declare launchFirefox="${projectDir}/tools/applescript/lib/src/launch-firefox.js";
declare screenshotOnly="${projectDir}/tools/applescript/lib/src/screenshot-only.js";

# スクショ
cd "${currentDir}"
mkdir -p "${currentSectionDir}/img/"
npx -q @js-primer/local-server . &
npx -q wait-on http://localhost:3000 \
&& node "${launchFirefox}" --url "http://localhost:3000/" \
&& read -p "追加イベントのスクショ: 'テスト'を追加 -> Enter" \
&& node "${screenshotOnly}" --output "${currentSectionDir}/img/add-todo-item.png"

# server 終了
function finish {
  echo "Shutting down the server..."
  pkill js-primer-local-server
}
trap finish INT KILL TERM EXIT
