<?php

/****************Actualitzar****************************/

if(isset($_POST['llista_clients'])) {

$llista=$_POST['llista_clients'];

foreach($llista as $ip){
echo $ip;
}
file_put_contents('/tmp/ips_seleccionades', implode("\n",$llista));
	//$res = exec('sudo /bin/bash /var/www/html/admin/scripts/clients.sh');
}

