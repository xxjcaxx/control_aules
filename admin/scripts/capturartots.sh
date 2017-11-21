#!/bin/bash
n=$(cat /var/lib/control_aules/observant)
echo $n
if [[ $n -gt 0 ]]
then
while read ip
do
	if echo $ip | grep '192.168.[0-9]*.1[0-2][0-9]' > /dev/null
	then
		echo "capturant $ip"
		sudo ssh -o "ConnectTimeout=10" -o "StrictHostKeyChecking no" root@${ip} 'bash -s' < /var/www/html/admin/scripts/captures.sh > /var/lib/control_aules/captura${ip}.jpg
         fi

done < /tmp/ips
fi
echo -n $(($n-1)) > /var/lib/control_aules/observant
