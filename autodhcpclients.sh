#!/bin/bash

if [ -e /tmp/nmap.hosts ]
then
echo "Nmap ya hecho"
else
nmap -sP 192.168.9.0/24 > /tmp/nmap.hosts
cat /tmp/nmap.hosts | egrep -o '(192.168.9.[0-9]+|([0-9A-F]{2}:){5}[0-9A-F]{2})' > /tmp/ipmac.hosts
fi

exec 3< /tmp/ipmac.hosts
while read ip <&3
do
 read mac <&3
 echo "El client amb la MAC $mac te la IP $ip. Escriu el ultim numero si vols canviar la IP:"
 read -p "defecte:[${ip/192.168.9.}]" ultim
 ultim=${ultim:-${ip/192.168.9.}}
 echo "192.168.9.$ultim"
 echo "host a$ultim { hardware ethernet $mac; fixed-address 192.168.9.$ultim; }" >> /tmp/dhcp.tmp
done
