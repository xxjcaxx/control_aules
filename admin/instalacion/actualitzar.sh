#!/bin/bash

ipin=$(/sbin/iptables -L TRAFFIC_ACCT_IN -x -n -v | grep '192.168.' | awk '{ print $8" "$2}')
ipout=$(/sbin/iptables -L TRAFFIC_ACCT_OUT -x -n -v | grep '192.168.' | awk '{ print $2}')

ips=$(paste -d " " <(echo "$ipin") <(echo "$ipout"))

#echo "$ips"
echo "$ips" | while read line
do
read cip cin cout <<< $line
#echo $line $cip $cin $cout
cip=$(echo $cip | cut -d"." -f4)
rrdtool update /var/lib/control_aules/client$cip.rrd $(date +%s):$cin:$cout
rrdtool graph /var/lib/control_aules/spd$cip.png --start -6h --end $(date +%s) DEF:sin=/var/lib/control_aules/client$cip.rrd:in:AVERAGE LINE2:sin\#FF0000:"in" DEF:sout=/var/lib/control_aules/client$cip.rrd:out:AVERAGE LINE2:sout\#00FF00:"out"
done

#echo $(date) >> /tmp/actualitzar
#echo $(date) >> actualitzar.log
