#!/bin/bash

export LANG=C
# Multipliquem per 8 per tindre en KBites
sar -n DEV | grep "eth0" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 | awk '{$1=$1; $2=$2*8; $3=$3*8; print }' | grep -v '^0[01234567]' | grep -v '^2[23]' > /tmp/eth0.tmp
sar -n DEV | grep "eth1" | grep -v "Average" | tr -s " " | cut -d" " -f1,5,6 | awk '{$1=$1; $2=$2*8; $3=$3*8; print }' | grep -v '^0[01234567]' | grep -v '^2[23]' > /tmp/eth1.tmp


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


### Traure la mitjana per tallar valors extrems i veure millor el consum normal
mitjana=$(echo $(cat /tmp/eth1.tmp | awk '{$3=$3*4; print}' | cut -d" " -f3 | paste -sd"+" | bc)'/'$(cat /tmp/eth1.tmp | wc -l) | bc)


gnuplot -c /var/www/html/admin/plot.plot $mitjana
