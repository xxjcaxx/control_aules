<?php
session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['ip'])){
           $res = exec('sudo ssh  -o "StrictHostKeyChecking no" root@192.168.9.'.$_GET['ip'].' \'bash -s\' < ./scripts/captures.sh > /var/lib/control_aules/captura'.$_GET['ip'].'.png' );
           echo $res;
           
	}
} //de la sesio
?>
