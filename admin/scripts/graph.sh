#!/bin/bash

export LANG=C

sar -n DEV | grep "eth2" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 | awk '{$1=$1; $2=$2*8; $3=$3*8; print }' > /tmp/eth2.tmp
sar -n DEV | grep "eth0" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 | awk '{$1=$1; $2=$2*8; $3=$3*8; print }' > /tmp/eth0.tmp
sar -n DEV | grep "eth1" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 | awk '{$1=$1; $2=$2*8; $3=$3*8; print }' > /tmp/eth1.tmp

##Mitjanes (sols eixida eth1)

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


gnuplot < /var/www/html/admin/plot.plot  
