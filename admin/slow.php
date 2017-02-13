<?php

session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['v'])){

$res = exec('sudo ip route change default via 10.20.0.1 dev eth2');
$res = exec('sudo wondershaper eth2 '.$_GET['v'].' '.$_GET['v']);
$res = exec('sudo ip route add 5.145.174.124 via 10.20.0.1 dev eth0');
$res = exec('sudo ip route add 192.168.80.0/24 via 10.20.0.1 dev eth0');
}
}
?>
