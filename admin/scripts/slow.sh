#!/bin/bash
PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin'
v=$1    # Velocitat
s=$2    # Velocitat de l'streaming
t=$3    # Tipus de QoS
b=$4    # Burst
m=$5    # Mode

[[ $t == "r" ]] && v=$s
[[ $m == "ban" ]] && mode='dstip'
[[ $m == "streaming" ]] && mode='dstip,srcip'


echo "Esborrant iptables"
iptables -t mangle -F
iptables -t mangle -X BULKCONN 
iptables -t mangle -X BULKDIST 

echo "Afegint iptables"
iptables -t mangle -N BULKCONN     ### Cua de prerouting del que entra per eth0. 
iptables -t mangle -N BULKDIST     ### tot el que fa forward passa per ací.
iptables -t mangle -I BULKCONN -p tcp -m tcp --sport 80 -j MARK --set-mark 5  # Tràfic web
iptables -t mangle -I BULKCONN -p tcp -m tcp --sport 443 -j MARK --set-mark 5  # Tràfic web
iptables -t mangle -I BULKCONN -p tcp -m tcp --sport 22 -j MARK --set-mark 8  # SSH
iptables -t mangle -I BULKCONN -p tcp -m tcp --dport 22 -j MARK --set-mark 8  # SSH 
iptables -t mangle -A BULKDIST -m hashlimit --hashlimit-above 30kb/s --hashlimit-burst ${b}mb --hashlimit-mode $mode --hashlimit-name bwlimit --hashlimit-htable-expire 20000 ! -s 10.100.22.0/24 -j MARK --set-mark 7
### Tot el que passa per buldisk i va a més de 30KBytes/s, té una descàrrega continuada de $b (10mb) i no vinga de la xarxa 10.100.22.0/24 es considera streaming. 
### Pot tindre dos modes: 
#### dstip: Fes distinció per IP de destí. Això evita detectar la suma de tots els clients. 
#### dstip, srctip: Distinció per IP de destí i d'orige. Això detecta més els streamings que venen d'una sola IP. Aquesta pot ser més justa.

iptables -t mangle -A PREROUTING -i eth0 -j BULKCONN
iptables -t mangle -A FORWARD -j BULKDIST

# Amb tan poc above el que fem és capturar tot el tràfic fins als 10mb
# Si fiquem un above major es sume aquesta velocitat a la de la cua, 
# ja que alguns paquets sols tenen la marca 5.

#iptables -L -t mangle -v

echo "Esborrant cues"
tc qdisc del dev eth1 root    2> /dev/null > /dev/null

echo "Afegint cues"
tc qdisc add dev eth1 root handle 1: htb default 12

tc class add dev eth1 parent 1: classid 1:1 htb rate ${v}kbps ceil ${v}kbps   # 1000kb = 8000Kbits
tc class add dev eth1 parent 1:1 classid 1:10 htb rate ${v}kbps ceil ${v}kbps  # Per a les Webs
tc class add dev eth1 parent 1:1 classid 1:11 htb rate ${v}kbps ceil ${v}kbps # Per al SSH
tc class add dev eth1 parent 1:1 classid 1:12 htb rate ${s}kbps ceil ${s}kbps   ######### 1:12 Streaming #########
#tc class add dev eth1 parent 1:1 classid 1:13 htb rate 80kbps ceil 100kbps    # Clients banejats a ma
#tc class add dev eth1 parent 1:1 classid 1:14 htb rate 150kbps ceil 200kbps   # Per defecte

#### La class pare 1:1 té ja un límit de el que diga $v que sol ser de 1000KB, és a dir 1MByte de descàrrega per a tota la classe. És com tindre una connexió de 8Mb en casa. 
#### Les pàgines web i ssh tenen la cua 1:10 amb la mateixa limitació que la classe sencera. 
#### Si es detecta un streaming, el client (dstip) o el streaming (dstip,srcip) van a la cua de streaming que pot ser de 60KB = 480Kb com a molt per a tots els que estiguen.

echo "Afegint filtre"

tc filter add dev eth1 parent 1: prio 1 protocol ip handle 5 fw flowid 1:10 # port 80
tc filter add dev eth1 parent 1: prio 4 protocol ip handle 8 fw flowid 1:11 # ssh
tc filter add dev eth1 parent 1: prio 3 protocol ip handle 7 fw flowid 1:12 ###### hashslimit streaming #########
#tc filter add dev eth1 parent 1: prio 2 protocol ip handle 6 fw flowid 1:13 # Banejats a ma

echo "Afegint politiques a les cues"
tc qdisc add dev eth1 parent 1:10 handle 20: sfq perturb 10
tc qdisc add dev eth1 parent 1:11 handle 30: sfq perturb 10
tc qdisc add dev eth1 parent 1:12 handle 40: sfq perturb 10
#tc qdisc add dev eth1 parent 1:13 handle 50: sfq perturb 10
#tc qdisc add dev eth1 parent 1:14 handle 60: sfq perturb 10


