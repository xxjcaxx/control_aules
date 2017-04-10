
<?php

if(isset($_GET['mac'])){
           $res=exec('echo '.$_GET['n'].' '.$_GET['mac'].' >> /tmp/alta');
	}
?>
