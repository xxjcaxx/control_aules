#!/bin/bash

export LANG=C

sar -n DEV | grep "eth2" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 > ./images/graph/eth2.tmp
sar -n DEV | grep "eth0" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 > ./images/graph/eth0.tmp
sar -n DEV | grep "eth1" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 > ./images/graph/eth1.tmp

gnuplot < plot.plot
