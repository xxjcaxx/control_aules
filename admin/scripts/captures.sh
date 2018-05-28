#!/bin/bash

export DISPLAY=:0
export XAUTHORITY=/home/$(who | grep 'tty7' | cut -d" " -f1)/.Xauthority
scrot -q 25 captura.png
#convert -quality 25 captura.png captura.jpg
cat captura.jpg

