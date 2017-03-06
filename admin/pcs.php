
<div id="clients">

<?php

$arp="no";

if($_GET['arp']==1){ $arp="arp"; }
else {}

if(isset($_GET['opt'])) {
   if($_GET['opt'] == 'actualitzar'){

	$res = exec('sudo /bin/bash /var/www/html/admin/scripts/clients.sh '.$arp);

	}
}

if(!file_exists ('/tmp/ips' )){

	$res = exec('sudo /bin/bash /var/www/html/admin/scripts/clients.sh '.$arp);
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
<div>
<button type="button" id="act_clients">Actualitzar clients</button> 
<label class="switch">
  <input type="checkbox" id="arp" value="1">
  <div class="slider"><span>Ampliar búsqueda amb arp</span></div>
  
</label>
</div>
</div>
