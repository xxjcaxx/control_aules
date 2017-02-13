#!/bin/bash

iptables -N TRAFFIC_ACCT_IN
iptables -N TRAFFIC_ACCT_OUT
iptables -I FORWARD -i eth0 -j TRAFFIC_ACCT_IN
iptables -I FORWARD -o eth0 -j TRAFFIC_ACCT_OUT
iptables -I FORWARD -i eth2 -j TRAFFIC_ACCT_IN
iptables -I FORWARD -o eth2 -j TRAFFIC_ACCT_OUT
for i in {1..200}; do iptables -A TRAFFIC_ACCT_IN --dst 192.168.9.$i; iptables -A TRAFFIC_ACCT_OUT --src 192.168.9.$i; done
iptables -L -n -v -x
