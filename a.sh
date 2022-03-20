#!/bin/bash
SCRIPT_PATH="/home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/one.sh"



#creating subprocess in the-one carpet executing the simulator
(cd /home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one; sudo "$SCRIPT_PATH" -b 1 "$1")

#if doesnt start replace with:
#(cd /home/jus/Desktop/TFG/wha/A/inbox-stw-a1-21-master/the-one/ ; grep "your password" | sudo "$SCRIPT_PATH" -b)

#IMPORTANT -> modify one.sh, with your non-relative path to the files
