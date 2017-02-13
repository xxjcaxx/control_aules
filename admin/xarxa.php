<?php
if($_GET['q']=='in'){
$res= exec('sudo sar -n DEV | grep "eth2" | grep -v "Average" | tr -s " " | cut -d" " -f5 | paste -sd","');

//$res= exec('sudo sar -n DEV > eth2.tmp');
echo $res;

$res = exec('sudo bash ./graph.sh');
}
if($_GET['q']=='out'){
$res= exec('sudo sar -n DEV | grep "eth2" | grep -v "Average" | tr -s " " | cut -d" " -f6 | paste -sd","');
echo $res;
}
// http://www.catonmat.net/blog/traffic-accounting-with-iptables/
?>


