<?php
session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['ip'])){
$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
           
$res = exec('sudo ssh  -o "StrictHostKeyChecking no" root@'.$prefijo.'.'.$_GET['ip'].' \'bash -s\' < ./scripts/captures.sh > /var/lib/control_aules/captura'.$_GET['ip'].'.png' );
           echo $res;
           
	}
} //de la sesio
?>
