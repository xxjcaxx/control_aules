<?php
session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['ip'])){
           $res = exec('sudo ssh root@192.168.9.'.$_GET['ip'].' \'shutdown 0\'');
           echo $res;
           
	}
} //de la sesio
?>
