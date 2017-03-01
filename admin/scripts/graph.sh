#!/bin/bash

export LANG=C

sar -n DEV | grep "eth2" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 > /tmp/eth2.tmp
sar -n DEV | grep "eth0" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 > /tmp/eth0.tmp
sar -n DEV | grep "eth1" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 > /tmp/eth1.tmp

gnuplot < plot.plot

iptables -L TRAFFIC_ACCT_IN -n -v -x > /tmp/clients_in.tmp
iptables -L TRAFFIC_ACCT_OUT -n -v -x > /tmp/clients_out.tmp

echo '{' > /tmp/ips_acct
while read ip
do
coma=','
[[ $ip == *254 ]] && coma=''
bytesin=$(grep "$ip " /tmp/clients_in.tmp | tr -s " " | cut -d" " -f3 )
bytesout=$(grep "$ip " /tmp/clients_out.tmp | tr -s " " | cut -d" " -f3 )
echo '"'$ip'": {"in": "'${bytesin:-0}'", "out": "'${bytesout:-0}'"}'$coma >> /tmp/ips_acct
done < /tmp/ips
echo '}' >> /tmp/ips_acct

