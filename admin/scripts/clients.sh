PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games'
xarxa=$(ifconfig | grep -o '192.168.[0-9]*.254' | cut -d'.' -f1-3)
nmap -sP ${xarxa}.0/24 > /tmp/clients

cat /tmp/clients | egrep -o ${xarxa}'.[0-9]+' | sort -V | uniq  > /tmp/ips

