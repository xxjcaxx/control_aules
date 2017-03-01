
<div id="clients">

<?php

if(isset($_GET['opt'])) {
   if($_GET['opt'] == 'actualitzar'){

	$res = exec('sudo /bin/bash /var/www/html/admin/scripts/clients.sh');

	}
}

if(!file_exists ('/tmp/ips' )){

	$res = exec('sudo /bin/bash /var/www/html/admin/scripts/clients.sh');
}

$handle = fopen("/tmp/ips", "r");

if ($handle) {
echo '<ul>';
    while (($line = fgets($handle)) !== false) {
        $line = str_replace("\n", "", $line);
        echo '<li id="c'.$line.'"><span>'.$line.'</span></li>'."\n"; 
    }

    fclose($handle);
echo '</ul>';
}

?>
 <button type="button" id="act_clients">Actualitzar clients</button> 
</div>
