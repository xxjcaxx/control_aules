<?php

session_start();
if($_SESSION['user']=='lliurex'){
if(isset($_GET['v'])){

$res = exec('sudo ip route change default via 10.20.0.1 dev eth2');
$res = exec('sudo wondershaper eth2 '.$_GET['v'].' '.$_GET['v']);

}
}
?>
