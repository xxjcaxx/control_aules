<?php

session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['v'])){

$vel=$_GET['v'];
$streaming=$_GET['s'];
$tipo=$_GET['tipo'];
$burst=$_GET['l'];
$mode=$_GET['m'];

$res = exec('sudo /bin/bash /var/www/html/admin/scripts/slow.sh '.$vel.' '.$streaming.' '.$tipo.' '.$burst.' '.$mode);

$log = date("Y-M-j g:i a").": QoS V=".$vel."KBs S=".$streaming."KBs Tipo=".$tipo." Burst=".$burst." Mode=".$mode." per: ".$_SERVER['REMOTE_ADDR'];

echo $log;

$res = exec('echo "'.$log.'" >> /var/lib/control_aules/control.log');
}
}
?>

