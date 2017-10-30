#!/bin/bash

export LANG=C

sar -n DEV | grep "eth2" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 | awk '{$1=$1; $2=$2*8; $3=$3*8; print }' > /tmp/eth2.tmp
sar -n DEV | grep "eth0" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 | awk '{$1=$1; $2=$2*8; $3=$3*8; print }' > /tmp/eth0.tmp
sar -n DEV | grep "eth1" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 | awk '{$1=$1; $2=$2*8; $3=$3*8; print }' > /tmp/eth1.tmp

##Mitjanes
> /tmp/eth1.mitjana.tmp
count=0
in=0
out=0
p=10
while read l
do
if [[ $(($count%$p)) -eq 0 ]]
then

in=$(bc -l <<< "$in/$p" )
out=$(bc -l <<< "$out/$p")
echo  $l | awk '{$1=$1; $2='$in'; $3='$out'; print}' >> /tmp/eth1.mitjana.tmp

in=0
out=0
else
in=$(bc -l <<< "$(echo $l | cut -d" " -f2)+$in")
out=$(bc -l <<< "$(echo $l | cut -d" " -f3)+$out")
fi

count=$(($count+1))
done < /tmp/eth1.tmp

## Fin de mitjanes


gnuplot < plot.plot

iptables -L TRAFFIC_ACCT_IN -n -v -x > /tmp/clients_in.tmp
iptables -L TRAFFIC_ACCT_OUT -n -v -x > /tmp/clients_out.tmp

echo '{' > /tmp/ips_acct
while read ip
do
coma=','
[[ $ip == *254 ]] && coma=''
bytesin=$(grep "$ip " /tmp/clients_in.tmp | tr -s " " | cut -d" " -f3 )
bitsin=$((${bytesin:-0}*8)) 
bytesout=$(grep "$ip " /tmp/clients_out.tmp | tr -s " " | cut -d" " -f3 )
bitsout=$((${bytesout:-0}*8)) 
#echo '"'$ip'": {"in": "'${bytesin:-0}'", "out": "'${bytesout:-0}'"}'$coma >> /tmp/ips_acct
echo '"'$ip'": {"in": "'${bitsin:-0}'", "out": "'${bitsout:-0}'"}'$coma >> /tmp/ips_acct
done < /tmp/ips
echo '}' >> /tmp/ips_acct

