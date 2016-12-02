<?php


$res = exec('sudo ip route change default via 10.20.0.1 dev eth2');
$res = exec('sudo wondershaper eth2 2000 2000');

?>
