#!/bin/bash

iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 8000 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 3000 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT
iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth2 -o eth1 -j ACCEPT
iptables -A FORWARD -i eth1 -o eth2 -j ACCEPT

read -p "dime el valor de X si 192.168.X.0: " n

iptables -N TRAFFIC_ACCT_IN
iptables -N TRAFFIC_ACCT_OUT
iptables -I FORWARD -i eth0 -j TRAFFIC_ACCT_IN
iptables -I FORWARD -o eth0 -j TRAFFIC_ACCT_OUT
iptables -I FORWARD -i eth2 -j TRAFFIC_ACCT_IN
iptables -I FORWARD -o eth2 -j TRAFFIC_ACCT_OUT
for i in {1..200}; do iptables -A TRAFFIC_ACCT_IN --dst 192.168.$n.$i; iptables -A TRAFFIC_ACCT_OUT --src 192.168.$n.$i; done
iptables -L -n -v -x
