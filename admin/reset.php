<?php


$res = exec('sudo ip route change default via 10.20.0.1 dev eth0');
$res = exec('sudo wondershaper clear eth2');

?>
