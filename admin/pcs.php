<?php

/****************Actualitzar****************************/

if(isset($_GET['opt'])) {
   if($_GET['opt'] == 'actualitzar'){
	$res = exec('sudo /bin/bash /var/www/html/admin/scripts/clients.sh nmap');
        
$handle = fopen("/tmp/ips", "r");
$separador = '';
if ($handle) {
    while (($line = fgets($handle)) !== false) {
	$line = trim(preg_replace('/\s+/', ' ', $line));
        echo $separador.''.$line;
        $separador=";"; 
    }
    fclose($handle);
}
	}
}

if(!file_exists ('/tmp/ips' )){
	$res = exec('sudo /bin/bash /var/www/html/admin/scripts/clients.sh');
}

/****** Obtindre llista de IPs *******/

if(isset($_GET['opt'])) {
   if($_GET['opt'] == 'solo_ips'){
$handle = fopen("/tmp/ips", "r");
$separador = '';
if ($handle) {
    while (($line = fgets($handle)) !== false) {
	$line = trim(preg_replace('/\s+/', ' ', $line));
        echo $separador.''.$line;
        $separador=";"; 
    }
    fclose($handle);
}}
}

/*************** IPs bloquejades ************/

if(isset($_GET['opt'])) {
   if($_GET['opt'] == 'bloqued'){
        $res = exec('sudo /sbin/iptables -S FORWARD | /bin/grep "DROP" | /bin/egrep -o "192.168.[0-9]+.[0-9]+" | tr "\n" " "');	
      echo $res;
	}
}


