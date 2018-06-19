
PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games'
xarxa=$(ifconfig | grep -o '192.168.[0-9]*.254' | cut -d'.' -f1-3)

if [[ $(cat /tmp/ips_seleccionades | wc -l) -gt 0 ]]
then
	cp /tmp/ips_seleccionades /tmp/ips
 
else 

if [[ $1 == 'nmap' ]]  ### Se li pot passar nmap per a que busque de forma més exausitva
then

	nmap -sP ${xarxa}.0/24 > /tmp/clients
	cat /tmp/clients | egrep -o ${xarxa}'.[0-9]+' | sort -V | uniq  > /tmp/ips

else ### Tan sols busca els clients que han tingut algo de tràfic en l'ultim periode.

	cp /tmp/clients_in.tmp /tmp/clients_in_last.tmp
	cp /tmp/clients_out.tmp /tmp/clients_out_last.tmp
	/sbin/iptables -L TRAFFIC_ACCT_IN -n -v -x > /tmp/clients_in.tmp
	/sbin/iptables -L TRAFFIC_ACCT_OUT -n -v -x > /tmp/clients_out.tmp

	diff /tmp/clients_out.tmp /tmp/clients_out_last.tmp | grep -o '192.168.[0-9]*\.[0-9]*' | sort | uniq > /tmp/ips
        echo -e "$xarxa.251\n$xarxa.252\n$xarxa.254" >> /tmp/ips

fi

fi
