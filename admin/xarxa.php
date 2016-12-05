<?php
if($_GET['q']=='in'){
$res= exec('sudo sar -n DEV | grep "eth0" | grep -v "Average" | tr -s " " | cut -d" " -f5 | paste -sd","');
echo $res;
}
if($_GET['q']=='out'){
$res= exec('sudo sar -n DEV | grep "eth0" | grep -v "Average" | tr -s " " | cut -d" " -f6 | paste -sd","');
echo $res;
}
?>
