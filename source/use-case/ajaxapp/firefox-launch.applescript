tell application "Firefox"
	quit
end tell
delay 1 --wait firefox
do shell script "open -a /Applications/Firefox.app --args -private"
delay 1 --wait firefox
set bounds of window 1 of application "Firefox" to {0, 0, 1280, 720}
