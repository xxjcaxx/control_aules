sudo chmod 666 clients.html
> alumnes
xarxa=$(ifconfig | grep -o '192.168.[0-9]*.254' | cut -d'.' -f1-3)

nmap -sP ${xarxa}.0/24 > /tmp/clients
cat /tmp/clients | egrep -o ${xarxa}'.[0-9]+' > /tmp/ips

echo '<ul>' > clients.html
while read ip
do

echo '<li id="c'${ip}'"><span>'$ip'</span></li>' >> clients.html
echo $ip >> alumnes
done < /tmp/ips

echo '</ul>' >> clients.html


cat alumnes | egrep '192.168.[0-9]+.1[0-9][0-9]' > alumness
mv alumness alumnes
