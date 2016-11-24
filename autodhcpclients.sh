#!/bin/bash

# detecció de la xarxa

xarxa=$(ifconfig | egrep -o '192.168.[0-9]+.254')
xarxa=${xarxa/254}
echo "Esta es la xarxa: $xarxa"
read -p "Pulsa per a continuar o ctrl-c per acabar"

# Buscar els clients
if [ -e /tmp/nmap.hosts ]
then
echo "Nmap ya hecho"
else
nmap -sP $xarxa0/24 > /tmp/nmap.hosts
cat /tmp/nmap.hosts | egrep -o '('$xarxa'[0-9]+|([0-9A-F]{2}:){5}[0-9A-F]{2})' > /tmp/ipmac.hosts
fi

# Anar un per un
exec 3< /tmp/ipmac.hosts
while read ip <&3
do
 read mac <&3
 echo "El client amb la MAC $mac te la IP $ip. Escriu el ultim numero si vols canviar la IP, si fiques la 100, sera el professor:"
 read -p "defecte:[${ip/$xarxa}]" ultim
 ultim=${ultim:-${ip/$xarxa}}
 echo "$xarxa$ultim"
 if [[ $ultim -eq 100 ]]; then
 echo "host profe { hardware ethernet $mac; fixed-address $xarxa$ultim; option routers ${xarxa}251;}" >> /tmp/dhcp.tmp
 else
 echo "host a$ultim { hardware ethernet $mac; fixed-address $xarxa$ultim; }" >> /tmp/dhcp.tmp
 fi
done

echo "El fitxer /tmp/dhcp.tmp conte la configuracio que s'espera en dhcpd.conf, cal revisar que es correcte i copiar dins"

