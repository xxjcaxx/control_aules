CEIL=1000
tc qdisc add dev eth1 root handle 1: htb default 15
tc class add dev eth1 parent 1: classid 1:1 htb rate ${CEIL}kbit ceil ${CEIL}kbit
tc class add dev eth1 parent 1:1 classid 1:10 htb rate 80kbit ceil 80kbit prio 0
tc class add dev eth1 parent 1:1 classid 1:11 htb rate 80kbit ceil ${CEIL}kbit prio 1
tc class add dev eth1 parent 1:1 classid 1:12 htb rate 20kbit ceil ${CEIL}kbit prio 2
tc class add dev eth1 parent 1:1 classid 1:13 htb rate 20kbit ceil ${CEIL}kbit prio 2
tc class add dev eth1 parent 1:1 classid 1:14 htb rate 10kbit ceil ${CEIL}kbit prio 3
tc class add dev eth1 parent 1:1 classid 1:15 htb rate 30kbit ceil ${CEIL}kbit prio 3
tc qdisc add dev eth1 parent 1:12 handle 120: sfq perturb 10
tc qdisc add dev eth1 parent 1:13 handle 130: sfq perturb 10
tc qdisc add dev eth1 parent 1:14 handle 140: sfq perturb 10
tc qdisc add dev eth1 parent 1:15 handle 150: sfq perturb 10


