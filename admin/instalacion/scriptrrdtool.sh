#!/bin/bash



mkdir /var/lib/control_aules

for i in {1..199}; do rrdtool create /var/lib/control_aules/client$i.rrd --start $(date +%s) --step 60 DS:in:COUNTER:600:U:U DS:out:COUNTER:600:U:U RRA:AVERAGE:0.5:1:360 RRA:AVERAGE:0.5:10:1008; done
cp actualitzar.sh /var/lib/control_aules/
echo "Crea un crontab -e para ejcutar cada minuto actualitzar.sh"
