<?php
session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['ip'])){
$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
           $res = exec('sudo wakeonlan -i '.$prefijo.'.'.$_GET['ip'].' $(arp | grep '.$prefijo.'.'.$_GET['ip'].' | grep -o ..:..:..:..:..:..)');
           echo $res;
           echo 'sudo wakeonlan -i '.$prefijo.'.'.$_GET['ip'].' $(arp | grep '.$prefijo.'.'.$_GET['ip'].' | grep -o ..:..:..:..:..:..)';           
	}
} //de la sesio
?>
