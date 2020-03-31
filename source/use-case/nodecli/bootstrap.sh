#!/bin/bash
# variable
declare scriptDir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
declare nodecliDir="$(scriptDir)"

# npm install
cd "${nodecliDir}/argument-parse/src" && npm install
cd "${nodecliDir}/md-to-html/src" && npm install
cd "${nodecliDir}/read-file/src" && npm install
cd "${nodecliDir}/refactor-and-unittest/src" && npm install
