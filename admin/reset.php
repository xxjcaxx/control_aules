<?php

echo "reset";
session_start();
if($_SESSION['user']=='lliurex'){
echo "reset lliurex";
$res = exec('sudo ip route change 10.20.0.0/16 dev eth0');
$res = exec('sudo ip route change default via 10.20.0.1 dev eth0');

//$res = exec('sudo wondershaper clear eth2');
$res = exec('sudo iptables -D $(sudo iptables-save | grep -o "FORWARD.*limit.*DROP")');
}
?>
