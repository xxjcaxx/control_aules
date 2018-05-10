#!/bin/bash
echo -e  "\n************** Estat del hashlimit **************"
cat /proc/net/ipt_hashlimit/bwlimit | grep '192.168.' | sort -nr

echo -e "\n\n************** Politiques de cues **************"
tc -s -d class show dev eth1
echo -e "\n\n************** Iptables Mangle **************"
iptables -t mangle -L -v


echo -e "\n\n************** vnstat **************"
vnstat -h -i eth1
vnstat -d -i eth1
vnstat -i eth1
