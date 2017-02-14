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

args=""
colors=$(cat /var/www/html/admin/images/graph/colors)
while read ip
do
ip=$(echo $ip | cut -d"." -f4)
color=$(($ip%64+1))
color=$(echo "$colors" | sed -n "$color p")
[[ $ip -lt 200 ]] && args=$args" DEF:sin$ip=/var/lib/control_aules/client$ip.rrd:in:AVERAGE LINE1:sin$ip$color:\"192.168.x.$ip\""
done < /tmp/ips

rrdtool graph /var/lib/control_aules/total.png --start -6h --end $(date +%s) $args
#rrdtool graph /var/lib/control_aules/total.png --start -6h --end $(date +%s) DEF:sin22=/var/lib/control_aules/client22.rrd:in:AVERAGE LINE1:sin22\#FF0000
#echo $(date) >> /tmp/actualitzar
#echo $(date) >> actualitzar.log
