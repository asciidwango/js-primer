#!/usr/bin/env bash

declare currentDir=$(pwd)
bash "${currentDir}/app-structure/todo-html/screenshot.sh"
sleep 5
bash "${currentDir}/entrypoint/first-entry/screenshot.sh"
