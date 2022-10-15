#!/usr/bin/env bash

declare projectDir=$(git rev-parse --show-toplevel);
declare todoappDir="${projectDir}/source/use-case/todoapp"
declare currentSectionDir="${todoappDir}/form-event"
declare currentDir="${todoappDir}/form-event/prevent-event"
declare screenshot="${projectDir}/tools/applescript/lib/src/screenshot.js";
declare screenshotDevTools="${projectDir}/tools/applescript/lib/src/screenshot-dev-tools.js";
declare launchFirefox="${projectDir}/tools/applescript/lib/src/launch-firefox.js";
declare screenshotOnly="${projectDir}/tools/applescript/lib/src/screenshot-only.js";

# スクショ
mkdir -p "${currentSectionDir}/img/"
cd "${currentDir}"
npx --yes -q @js-primer/local-server . &
npx --yes -q wait-on http://localhost:3000 \
&& node "${launchFirefox}" --devTools --url "http://localhost:3000/" \
&& read -p "追加イベントのスクショ: 'テスト'を追加 > コンソールを開く -> Enter" \
&& node "${screenshotOnly}" --output "${currentSectionDir}/img/prevent-event.png"

# server 終了
function finish {
  echo "Shutting down the server..."
  pkill js-primer-local-server
}
trap finish INT TERM EXIT
