<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if($_SESSION['user']=='lliurex'){

if(isset($_GET['order'])){



if($_GET['order'] == 'apagar'){

if(isset($_GET['ip'])){
$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
           $res = exec('sudo ssh root@'.$prefijo.'.'.$_GET['ip'].' \'shutdown 0\'');
           echo $res;
           
	}

 } // de apagar

if($_GET['order'] == 'bloquear'){
$log="";
if(isset($_GET['ip'])){
	$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
//        echo $prefijo."\n";

if($_GET['ip']=='dtots'){ // Desbloquejar a tots
	for($i=101;$i<200;$i++){
		$res = exec('sudo iptables -D FORWARD -s '.$prefijo.'.'.$i.' -j DROP'); 
		}
	for($i=1;$i<99;$i++){
		$res = exec('sudo iptables -D FORWARD -s '.$prefijo.'.'.$i.' -j DROP'); 
		}
$log = date("Y-M-j g:i a").": Desbloquejar tots els equips per: ".$_SERVER['REMOTE_ADDR'];

	}


else if($_GET['ip']=='btots'){ //Bloquejar a tots
	for($i=101;$i<200;$i++){
		$res = exec('sudo iptables -I FORWARD 1 -s '.$prefijo.'.'.$i.' -j DROP'); 
		}
	for($i=1;$i<99;$i++){
		$res = exec('sudo iptables -I FORWARD 1 -s '.$prefijo.'.'.$i.' -j DROP'); 
		}

$log = date("Y-M-j g:i a").": Bloquejar tots els equips per: ".$_SERVER['REMOTE_ADDR'];
	}
else {
	$res = exec('sudo iptables -C FORWARD -s '.$_GET['ip'].' -j DROP || sudo iptables -I FORWARD 1 -s '.$_GET['ip'].' -j DROP');
$log = date("Y-M-j g:i a").": Bloquejar ".$_GET['ip']." per: ".$_SERVER['REMOTE_ADDR'];
}
} 

if(isset($_GET['ipd'])){
$res = exec('sudo iptables -D FORWARD -s '.$_GET['ipd'].' -j DROP');

$log = date("Y-M-j g:i a").": Desbloquejar ".$_GET['ipd']." per: ".$_SERVER['REMOTE_ADDR'];
	}

echo $log;
$res = exec('echo "'.$log.'" >> /var/lib/control_aules/control.log');

} // de bloquejar



if($_GET['order'] == 'capturar'){
if(isset($_GET['ip'])){
$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
           
$res = exec('sudo ssh -o "ConnectTimeout=10" -o "StrictHostKeyChecking no" root@'.$prefijo.'.'.$_GET['ip'].' \'bash -s\' < ./scripts/captures.sh > /var/lib/control_aules/captura'.$_GET['ip'].'.jpg' );
           echo $res;
           
	}
if(isset($_GET['targets'])){
$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
           
echo $_GET['targets'];
$res = exec('for i in '.$_GET['targets'].'; do sudo ssh -o "ConnectTimeout=10" -o "StrictHostKeyChecking no" root@'.$prefijo.'.$i \'bash -s\' < ./scripts/captures.sh > /var/lib/control_aules/captura$i.jpg; echo "Capturant: $i '.$_GET['targets'].'"; done' );
           echo $res;
           
	}
} // de capturar



if($_GET['order'] == 'iptables'){
?>

<pre>
<?php
//echo "\n----------------ADM GENERAL ---------------\n";
//system('sudo iptables -L');
echo "\n---------------- Route -n ---------------\n";
system('sudo route -n');

echo "\n---------------- NAT ---------------\n";
system('sudo iptables -t nat -L -v');

echo "\n---------------- IPtables-save ---------------\n";
system('sudo iptables-save | grep -v ACCT'); //llevar els de comptabilitat
?>


</pre>
<?php
} // de iptables


if($_GET['order'] == 'mapa'){
?>
<div id="mapa">
<div class="mapa_fila" id="fila1">
<div class="mapa_pc" id="mapa_pc_101"><a target="_blank" href="images/graph/control_aules/captura101.jpg"><div class="pantalla" id="mapa_pantalla_101"/></a></div>
<div class="mapa_pc" id="mapa_pc_102"><a target="_blank" href="images/graph/control_aules/captura102.jpg"><div class="pantalla" id="mapa_pantalla_102"/></a></div>
<div class="mapa_pc" id="mapa_pc_103"><a target="_blank" href="images/graph/control_aules/captura103.jpg"><div class="pantalla" id="mapa_pantalla_103"/></a></div>
<div class="mapa_pc" id="mapa_pc_104"><a target="_blank" href="images/graph/control_aules/captura104.jpg"><div class="pantalla" id="mapa_pantalla_104"/></a></div>
<div class="mapa_pc" id="mapa_pc_105"><a target="_blank" href="images/graph/control_aules/captura105.jpg"><div class="pantalla" id="mapa_pantalla_105"/></a></div>
<div class="mapa_pc" id="mapa_pc_106"><a target="_blank" href="images/graph/control_aules/captura106.jpg"><div class="pantalla" id="mapa_pantalla_106"/></a></div>
</div>
<div  class="mapa_fila" id="fila2">
<div class="mapa_pc" id="mapa_pc_107"><a target="_blank" href="images/graph/control_aules/captura107.jpg"><div class="pantalla" id="mapa_pantalla_107"/></a></div>
<div class="mapa_pc" id="mapa_pc_108"><a target="_blank" href="images/graph/control_aules/captura108.jpg"><div class="pantalla" id="mapa_pantalla_108"/></a></div>
<div class="mapa_pc" id="mapa_pc_109"><a target="_blank" href="images/graph/control_aules/captura109.jpg"><div class="pantalla" id="mapa_pantalla_109"/></a></div>
<div class="mapa_pc" id="mapa_pc_110"><a target="_blank" href="images/graph/control_aules/captura110.jpg"><div class="pantalla" id="mapa_pantalla_110"/></a></div>
<div class="mapa_pc" id="mapa_pc_111"><a target="_blank" href="images/graph/control_aules/captura111.jpg"><div class="pantalla" id="mapa_pantalla_111"/></a></div>
<div class="mapa_pc" id="mapa_pc_112"><a target="_blank" href="images/graph/control_aules/captura112.jpg"><div class="pantalla" id="mapa_pantalla_112"/></a></div>
</div>
<div class="mapa_fila" id="fila3">
<div class="mapa_pc" id="mapa_pc_113"><a target="_blank" href="images/graph/control_aules/captura113.jpg"><div class="pantalla" id="mapa_pantalla_113"/></a></div>
<div class="mapa_pc" id="mapa_pc_114"><a target="_blank" href="images/graph/control_aules/captura114.jpg"><div class="pantalla" id="mapa_pantalla_114"/></a></div>
<div class="mapa_pc" id="mapa_pc_115"><a target="_blank" href="images/graph/control_aules/captura115.jpg"><div class="pantalla" id="mapa_pantalla_115"/></a></div>
<div class="mapa_pc" id="mapa_pc_116"><a target="_blank" href="images/graph/control_aules/captura116.jpg"><div class="pantalla" id="mapa_pantalla_116"/></a></div>
<div class="mapa_pc" id="mapa_pc_117"><a target="_blank" href="images/graph/control_aules/captura117.jpg"><div class="pantalla" id="mapa_pantalla_117"/></a></div>
<div class="mapa_pc" id="mapa_pc_118"><a target="_blank" href="images/graph/control_aules/captura118.jpg"><div class="pantalla" id="mapa_pantalla_118"/></a></div>
</div>
<div class="mapa_fila" id="fila4">
<div class="mapa_pc" id="mapa_pc_119"><a target="_blank" href="images/graph/control_aules/captura119.jpg"><div class="pantalla" id="mapa_pantalla_119"/></a></div>
<div class="mapa_pc" id="mapa_pc_120"><a target="_blank" href="images/graph/control_aules/captura120.jpg"><div class="pantalla" id="mapa_pantalla_120"/></a></div>
<div class="mapa_pc" id="mapa_pc_121"><a target="_blank" href="images/graph/control_aules/captura121.jpg"><div class="pantalla" id="mapa_pantalla_121"/></a></div>
<div class="mapa_pc" id="mapa_pc_122"><a target="_blank" href="images/graph/control_aules/captura122.jpg"><div class="pantalla" id="mapa_pantalla_122"/></a></div>
<div class="mapa_pc" id="mapa_pc_123"><a target="_blank" href="images/graph/control_aules/captura123.jpg"><div class="pantalla" id="mapa_pantalla_123"/></a></div>
<div class="mapa_pc" id="mapa_pc_124"><a target="_blank" href="images/graph/control_aules/captura124.jpg"><div class="pantalla" id="mapa_pantalla_124"/></a></div>
</div>
</div>
<?php
} // de mapa



if($_GET['order'] == 'monitorqos'){
?>
<pre>
<?php
system('sudo /bin/bash /var/www/html/admin/scripts/monqos.sh');
?>

</pre>
<?php
} // de monitorqos



if($_GET['order'] == 'notificar'){

if(isset($_GET['ip'])){
           $res = exec('sudo ssh root@192.168.9.'.$_GET['ip'].' \'DISPLAY=:0 sudo -u $(who | grep tty7 | cut -d" " -f1) notify-send "'.$_GET['mensaje'].'$(ifconfig)" \'' );
           echo $res;
           
	}

} // de notificar



if($_GET['order'] == 'observar'){
$res = exec('echo -n 5 > /var/lib/control_aules/observant');
} // de observar
	 

if($_GET['order'] == 'reset'){
echo "reset lliurex";
$res= exec('sudo iptables -t mangle -F');
$res = exec('sudo iptables -t mangle -X BULKCONN'); 
$res = exec('sudo tc qdisc del dev eth1 root 2> /dev/null > /dev/null');
$log = date("Y-M-j g:i a").": QoS Reset per: ".$_SERVER['REMOTE_ADDR'];
echo $log;
$res = exec('echo "'.$log.'" >> /var/lib/control_aules/control.log');
} // de reset



if($_GET['order'] == 'slow'){
if(isset($_GET['v'])){

$vel=$_GET['v'];
$streaming=$_GET['s'];
$tipo=$_GET['tipo'];
$burst=$_GET['l'];
$mode=$_GET['m'];

$res = exec('sudo /bin/bash /var/www/html/admin/scripts/slow.sh '.$vel.' '.$streaming.' '.$tipo.' '.$burst.' '.$mode);

$log = date("Y-M-j g:i a").": QoS V=".$vel."KBs S=".$streaming."KBs Tipo=".$tipo." Burst=".$burst." Mode=".$mode." per: ".$_SERVER['REMOTE_ADDR'];

echo $log;

$res = exec('echo "'.$log.'" >> /var/lib/control_aules/control.log');
}
} // de slow


if($_GET['order'] == 'wol'){
if(isset($_GET['ip'])){
$prefijo=exec("ifconfig | egrep -o '192.168.[0-9]+'");
           $res = exec('sudo wakeonlan -i '.$prefijo.'.'.$_GET['ip'].' $(arp | grep '.$prefijo.'.'.$_GET['ip'].' | grep -o ..:..:..:..:..:..)');
           echo $res;
           echo 'sudo wakeonlan -i '.$prefijo.'.'.$_GET['ip'].' $(arp | grep '.$prefijo.'.'.$_GET['ip'].' | grep -o ..:..:..:..:..:..)';           
	}
} // de wol



} //de order

} //de la sessio
?>
