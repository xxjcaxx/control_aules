<?php
session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['ip'])){
           $res = exec('sudo ssh root@192.168.9.'.$_GET['ip'].' \'DISPLAY=:0 sudo -u $(who | grep tty7 | cut -d" " -f1) notify-send "'.$_GET['mensaje'].'$(ifconfig)" \'' );
           echo $res;
           
	}
} //de la sesio
?>
