<?php
session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['ip'])){
	$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
        echo $prefijo."\n";

if($_GET['ip']=='dtots'){ // Bloquejar a tots
	//-m iprange --src-range 192.168.1.100-192.168.1.200
	for($i=101;$i<200;$i++){
		$res = exec('sudo iptables -D FORWARD -s '.$prefijo.'.'.$i.' -j DROP'); 
		//echo $i."\n";
		}
	for($i=1;$i<99;$i++){
		$res = exec('sudo iptables -D FORWARD -s '.$prefijo.'.'.$i.' -j DROP'); 
		//echo $i."\n";
		}
	}


if($_GET['ip']=='btots'){
	//-m iprange --src-range 192.168.1.100-192.168.1.200
	for($i=101;$i<200;$i++){
		$res = exec('sudo iptables -I FORWARD 1 -s '.$prefijo.'.'.$i.' -j DROP'); 
		//echo $i."\n";
		}
	for($i=1;$i<99;$i++){
		$res = exec('sudo iptables -I FORWARD 1 -s '.$prefijo.'.'.$i.' -j DROP'); 
		//echo $i."\n";
		}
	}
else {
	$res = exec('sudo iptables -C FORWARD -s '.$_GET['ip'].' -j DROP || sudo iptables -I FORWARD 1 -s '.$_GET['ip'].' -j DROP');
}
} 

if(isset($_GET['ipd'])){
	
$res = exec('sudo iptables -D FORWARD -s '.$_GET['ipd'].' -j DROP');
	}
} //de la sesio
// TODO 
// Bloquejar tot internet als alumnes en la seua màquina però permetre desbloquejar-lo.
// https://serverfault.com/questions/198966/iptables-blocking-outbound-traffic-except-to-certain-ip-addresses


?>
