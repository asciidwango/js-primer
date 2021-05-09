#!/usr/bin/env bash
declare currentDir=$(pwd)
# マニュアル操作が必要なもの
bash "${currentDir}/form-event/prevent-event/screenshot.sh"
sleep 5
bash "${currentDir}/form-event/add-todo-item/screenshot.sh"
