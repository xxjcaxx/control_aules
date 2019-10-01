<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if($_SESSION['user']=='lliurex'){
$log="";
if(isset($_GET['ip'])){
	$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
//        echo $prefijo."\n";

if($_GET['ip']=='dtots'){ // Desbloquejar a tots
	for($i=101;$i<200;$i++){
		$res = exec('sudo iptables -D FORWARD -s '.$prefijo.'.'.$i.' -j DROP'); 
		}
	for($i=1;$i<99;$i++){
		$res = exec('sudo iptables -D FORWARD -s '.$prefijo.'.'.$i.' -j DROP'); 
		}
$log = date("Y-M-j g:i a").": Desbloquejar tots els equips per: ".$_SERVER['REMOTE_ADDR'];

	}


else if($_GET['ip']=='btots'){ //Bloquejar a tots
	for($i=101;$i<200;$i++){
		$res = exec('sudo iptables -I FORWARD 1 -s '.$prefijo.'.'.$i.' -j DROP'); 
		}
	for($i=1;$i<99;$i++){
		$res = exec('sudo iptables -I FORWARD 1 -s '.$prefijo.'.'.$i.' -j DROP'); 
		}

$log = date("Y-M-j g:i a").": Bloquejar tots els equips per: ".$_SERVER['REMOTE_ADDR'];
	}
else {
	$res = exec('sudo iptables -C FORWARD -s '.$_GET['ip'].' -j DROP || sudo iptables -I FORWARD 1 -s '.$_GET['ip'].' -j DROP');
$log = date("Y-M-j g:i a").": Bloquejar ".$_GET['ip']." per: ".$_SERVER['REMOTE_ADDR'];
}
} 

if(isset($_GET['ipd'])){
$res = exec('sudo iptables -D FORWARD -s '.$_GET['ipd'].' -j DROP');

$log = date("Y-M-j g:i a").": Desbloquejar ".$_GET['ipd']." per: ".$_SERVER['REMOTE_ADDR'];
	}

echo $log;
$res = exec('echo "'.$log.'" >> /var/lib/control_aules/control.log');
} //de la sesio
// TODO 
// Bloquejar tot internet als alumnes en la seua màquina però permetre desbloquejar-lo.
// https://serverfault.com/questions/198966/iptables-blocking-outbound-traffic-except-to-certain-ip-addresses


?>
