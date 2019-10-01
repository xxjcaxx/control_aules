<?php
session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['ip'])){
$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
           $res = exec('sudo ssh root@'.$prefijo.'.'.$_GET['ip'].' \'shutdown 0\'');
           echo $res;
           
	}
} //de la sesio
?>
