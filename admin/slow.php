<?php

session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['v'])){

$vel=$_GET['v'];
$streaming=$_GET['s'];
$tipo=$_GET['tipo'];
$burst=$_GET['l'];
$mode=$_GET['m'];

$res = exec('sudo /bin/bash /var/www/html/admin/scripts/slow.sh '.$vel.' '.$streaming.' '.$tipo.' '.$burst.' '.$mode);
/*$burst=($vel/1000)+1;
$log = date("Y-M-j g:i a").": Desbloquejar tots els equips per: ".$_SERVER['REMOTE_ADDR'];

$res = exec('sudo ip route change default via 10.20.0.1 dev eth2');

$res = exec('sudo ip route change 10.20.0.0/16 dev eth2');
$res = exec('sudo iptables -I FORWARD -m hashlimit --hashlimit-above '.$vel.'kb/sec --hashlimit-burst '.$burst.'mb --hashlimit-mode dstip --hashlimit-name bwlimit -j DROP');

$res = exec('sudo ip route add 5.145.174.124 via 10.20.0.1 dev eth0');
$res = exec('sudo ip route add 192.168.80.0/24 via 10.20.0.1 dev eth0');
$res = exec('sudo ip route add 172.27.0.0/16 via 10.20.0.1 dev eth0');
*/
$log = date("Y-M-j g:i a").": QoS V=".$vel."KBs S=".$streaming."KBs Tipo=".$tipo." Burst=".$burst." Mode=".$mode." per: ".$_SERVER['REMOTE_ADDR'];
echo $log;
$res = exec('echo "'.$log.'" >> /var/lib/control_aules/control.log');
}
}
?>

