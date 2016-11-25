
<div id="clients">
 <button type="button" id="act_clients">Actualitzar clients</button> 
<?php

if(isset($_GET['opt'])) {
   if($_GET['opt'] == 'actualitzar'){

$res = exec('/bin/bash /var/www/html/admin/clients.sh');

echo $res;

}
}


$clients=file_get_contents('clients.html');
echo $clients
?>
</div>
