<?php

if(isset($_GET['ip'])){
$res = exec('sudo iptables -C FORWARD -s '.$_GET['ip'].' -j DROP || sudo iptables -A FORWARD -s '.$_GET['ip'].' -j DROP');
} 

if(isset($_GET['ipd'])){
	
$res = exec('sudo iptables -D FORWARD -s '.$_GET['ipd'].' -j DROP');
	}
?>
