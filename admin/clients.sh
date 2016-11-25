nmap -sP 192.168.8.0/24 > /tmp/clients
cat /tmp/clients | egrep -o '192.168.8.[0-9]+' > /tmp/ips

echo '<ul>' > clients.html
while read ip
do

echo '<li id="c'${ip}'">'$ip'</li>' >> clients.html

done < /tmp/ips

echo '</ul>' >> clients.html

