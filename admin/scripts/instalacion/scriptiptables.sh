#!/bin/bash

read -p "dime el valor de X si 192.168.X.0: " n

iptables -N TRAFFIC_ACCT_IN
iptables -N TRAFFIC_ACCT_OUT
iptables -I FORWARD -i eth0 -j TRAFFIC_ACCT_IN
iptables -I FORWARD -o eth0 -j TRAFFIC_ACCT_OUT
iptables -I FORWARD -i eth2 -j TRAFFIC_ACCT_IN
iptables -I FORWARD -o eth2 -j TRAFFIC_ACCT_OUT
for i in {1..200}; do iptables -A TRAFFIC_ACCT_IN --dst 192.168.$n.$i; iptables -A TRAFFIC_ACCT_OUT --src 192.168.$n.$i; done
iptables -L -n -v -x
