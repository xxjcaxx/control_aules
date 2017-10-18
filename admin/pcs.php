<?php

$solo_ips=0;


if(isset($_GET['opt'])) {
   if($_GET['opt'] == 'actualitzar'){

	$res = exec('sudo /bin/bash /var/www/html/admin/scripts/clients.sh');

	}
}

if(!file_exists ('/tmp/ips' )){

	$res = exec('sudo /bin/bash /var/www/html/admin/scripts/clients.sh');
}


if(isset($_GET['opt'])) {
   if($_GET['opt'] == 'solo_ips'){

$solo_ips=1;
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

if($solo_ips==0){

?>
<div id="clients">
<?php
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
<div>
<button type="button" id="act_clients">Actualitzar clients</button> 
</div>
</div>
<?php } ?>
