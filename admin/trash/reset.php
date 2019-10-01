<?php

echo "reset";
session_start();
if($_SESSION['user']=='lliurex'){
echo "reset lliurex";
//$res = exec('sudo ip route change 10.20.0.0/16 dev eth0');
//$res = exec('sudo ip route change default via 10.20.0.1 dev eth0');

//$res = exec('sudo wondershaper clear eth2');
//$res = exec('sudo iptables -D $(sudo iptables-save | grep -o "FORWARD.*limit.*DROP")');
$res= exec('sudo iptables -t mangle -F');
$res = exec('sudo iptables -t mangle -X BULKCONN'); 
$res = exec('sudo tc qdisc del dev eth1 root 2> /dev/null > /dev/null');
$log = date("Y-M-j g:i a").": QoS Reset per: ".$_SERVER['REMOTE_ADDR'];
echo $log;
$res = exec('echo "'.$log.'" >> /var/lib/control_aules/control.log');
}
?>
