#!/bin/bash
echo -e  "\n************** Estat del hashlimit **************"
cat /proc/net/ipt_hashlimit/bwlimit | grep '192.168.' | sort -nr

echo -e "\n\n************** Politiques de cues **************"
echo 'tc class add dev eth1 parent 1: classid 1:1 htb rate ${v}kbps ceil ${v}kbps   # 1000kb = 8000Kbits
tc class add dev eth1 parent 1:1 classid 1:10 htb rate ${v}kbps ceil ${v}kbps  # Per a les Webs
tc class add dev eth1 parent 1:1 classid 1:11 htb rate ${v}kbps ceil ${v}kbps # Per al SSH
tc class add dev eth1 parent 1:1 classid 1:12 htb rate ${s}kbps ceil ${s}kbps   ######### 1:12 Streaming #########
#tc class add dev eth1 parent 1:1 classid 1:13 htb rate 80kbps ceil 100kbps    # Clients banejats a ma
tc class add dev eth1 parent 1:1 classid 1:14 htb rate 150kbps ceil 200kbps   # Per defecte

'

tc -s -d class show dev eth1
echo -e "\n\n************** Iptables Mangle **************"
iptables -t mangle -L -v


echo -e "\n\n************** vnstat **************"
vnstat -h -i eth1
vnstat -d -i eth1
vnstat -i eth1
