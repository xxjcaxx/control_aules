#!/bin/bash

export DISPLAY=:0
export XAUTHORITY=/home/$(who | grep 'tty7' | cut -d" " -f1)/.Xauthority
scrot captura.png
cat captura.png

