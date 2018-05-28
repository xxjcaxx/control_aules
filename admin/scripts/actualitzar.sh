#!/bin/bash
#
# Aquest script és cridat cada minut per actualitzar la informació dels gràfics de xarxa i altres coses.
#

####################### Traure tot el tràfic de cada client
#cp /tmp/clients_in.tmp /tmp/clients_in_last.tmp
#cp /tmp/clients_out.tmp /tmp/clients_out_last.tmp
#/sbin/iptables -L TRAFFIC_ACCT_IN -n -v -x > /tmp/clients_in.tmp
#/sbin/iptables -L TRAFFIC_ACCT_OUT -n -v -x > /tmp/clients_out.tmp

/bin/bash /var/www/html/admin/scripts/clients.sh 



####################### Generar un json amb les dades de consum per IP
#echo '{' > /tmp/ips_acct
#while read ip
#do
#	bytesin=$(grep "$ip " /tmp/clients_in.tmp | tr -s " " | cut -d" " -f3 )
#	bitsin=$((${bytesin:-0}*8)) 
#	bytesout=$(grep "$ip " /tmp/clients_out.tmp | tr -s " " | cut -d" " -f3 )
#	bitsout=$((${bytesout:-0}*8)) 
#	echo '"'$ip'": {"in": "'${bitsin:-0}'", "out": "'${bitsout:-0}'"},' >> /tmp/ips_acct
#done < /tmp/ips
#sed -zri 's/,([^,]*$)/\1/' /tmp/ips_acct
#echo '}' >> /tmp/ips_acct

ips="$(grep -o '192.168.[0-9]*\.[0-9]*' /tmp/clients_in.tmp)"

echo '{' > /tmp/ips_acct
for ip in $ips
do
	bytesin=$(grep "$ip " /tmp/clients_in.tmp | tr -s " " | cut -d" " -f3 )
	bitsin=$((${bytesin:-0}*8)) 
	bytesout=$(grep "$ip " /tmp/clients_out.tmp | tr -s " " | cut -d" " -f3 )
	bitsout=$((${bytesout:-0}*8)) 
	echo '"'$ip'": {"in": "'${bitsin:-0}'", "out": "'${bitsout:-0}'"},' >> /tmp/ips_acct
done
sed -zri 's/,([^,]*$)/\1/' /tmp/ips_acct
echo '}' >> /tmp/ips_acct
######################## Generar gràfics de consum per IP
ipin=$(cat /tmp/clients_in.tmp | grep '192.168.' | awk '{ print $8" "$2}')
ipout=$(cat /tmp/clients_out.tmp | grep '192.168.' | awk '{ print $2}')

ips=$(paste -d " " <(echo "$ipin") <(echo "$ipout"))

#echo "$ips"
echo "$ips" | while read line
do
read cip cin cout <<< $line
#echo $line $cip $cin $cout
cin=$(($cin*8))
cout=$(($cout*8))
cip=$(echo $cip | cut -d"." -f4)
rrdtool update /var/lib/control_aules/client$cip.rrd $(date +%s):$cin:$cout
rrdtool graph /var/lib/control_aules/spd$cip.png --start -3h --end $(date +%s) DEF:sin=/var/lib/control_aules/client$cip.rrd:in:AVERAGE CDEF:kbin=sin,1024,\/ LINE1:kbin\#FF0000:"in" DEF:sout=/var/lib/control_aules/client$cip.rrd:out:AVERAGE CDEF:kbout=sout,1024,\/ LINE1:kbout\#00FF00:"out"
done


######################## Generar gràfics de consum general

args=""
colors=$(cat /var/www/html/admin/images/graph/colors)
while read ip
do
	ip=$(echo $ip | cut -d"." -f4)
	color=$(($ip%64+1))
	color=$(echo "$colors" | sed -n "$color p")
	[[ $ip -lt 200 ]] && args=$args" DEF:sin$ip=/var/lib/control_aules/client$ip.rrd:in:AVERAGE CDEF:kbin$ip=sin$ip,1024,/ LINE1:kbin$ip$color:\"192.168.x.$ip\""
done < /tmp/ips

if [[ $(cat /tmp/ips | wc -l) -lt 4 ]]
then
  for ip in {101..124}
  do
	color=$(($ip%64+1))
	color=$(echo "$colors" | sed -n "$color p")
	[[ $ip -lt 200 ]] && args=$args" DEF:sin$ip=/var/lib/control_aules/client$ip.rrd:in:AVERAGE CDEF:kbin$ip=sin$ip,1024,/ LINE1:kbin$ip$color:\"192.168.x.$ip\""
  done
fi

rrdtool graph /var/lib/control_aules/total5minuts.png --start -11m --end $(date +%s) $args
rrdtool graph /var/lib/control_aules/totalhora.png --start -2h --end $(date +%s) $args
rrdtool graph /var/lib/control_aules/total.png --start -6h --end $(date +%s) --alt-autoscale-max ${args//AVERAGE/AVERAGE:step=180} 
#echo ${args//AVERAGE/AVERAGE:step=6000}
rrdtool graph /var/lib/control_aules/totalsemana.png --start -6d --end $(date +%s) $args
rrdtool graph /var/lib/control_aules/totalsemanamedia.png --start -6d --end $(date +%s) ${args//AVERAGE/AVERAGE:step=3600}


# calcular el nmap cada vegada

#/bin/bash /var/www/html/admin/scripts/clients.sh 
/bin/bash /var/www/html/admin/scripts/graph.sh 

# Capturar

/bin/bash /var/www/html/admin/scripts/capturartots.sh 


