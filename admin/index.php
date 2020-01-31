 <?php 
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
if(! empty($_POST['uname']) && !empty($_POST['psw']))
{

$hash='$2y$10$5h/K5/Vj.ODkl0hchxJ2BeEPWSj1ZZjBU1qCpiu2czdULkfzmOkeO';
//$passs=password_hash($_POST['psw'], PASSWORD_DEFAULT);

if(password_verify($_POST['psw'], $hash)){
$_SESSION['user']='lliurex';
}
else{
echo '<p>Contrasenya no valida</p>';
}

}
}
?>
<!doctype html>

<html lang="es">
<head>
  <meta charset="utf-8">

  <title>Administrador aula</title>
  <meta name="description" content="Panel administrador">
  <meta name="author" content="Castillo">

  <link rel="stylesheet" href="css/styles.css?v=1.0">
</head>
<body>
	<script src="js/jquery-3.1.1.min.js"></script>
	<script src="js/scripts.js"></script>
	<div id="contenedor">
<?php 
if(isset($_SESSION['user'])){
if($_SESSION['user']=='lliurex'){

$command="/sbin/ifconfig eth1 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'";
$localIP = exec ($command);
//echo $localIP;
$command="/sbin/ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'";
$externalIP = exec ($command);

?>
		<div id="accions">
			<h1 id="control">Control d'Aula</h1>
			<span class="accio" id="btots">Bloquejar a tots</span>
			<span class="accio" id="dtots">Desbloquejar a tots</span>
			<span class="accio" id="ralentir">Velocitat molt lenta</span> 
			<span class="acciof" id="qosf">QoS:</br>
			<label>http\https:</label><input type="number" id="velocitat" value="1000"/>KB/s </br>
			<label>Streaming:</label> <input type="number" id="streaming" value="60"/>KB/s </br>
			<label>Límit:</label> <input type="number" id="burst" value="10"/>MB </br>
			<label>Mode:</label> <select name="mode" id="banmode">
				  <option value="ban">1 Banejar tot als que abusen</option>
				  <option value="streaming">2 Banejar Streaming als que abusen</option>
				</select></span>
			<span class="accio" id="qos">Aplicar QoS</span>
			<span class="accio" id="reset">Velocitat sense límit</span>
			<h1 style="font-size:1em;" id="totes">Totes les aules</h1>
                        <span class="accio"><a href="https://10.20.8.253/admin">2DAM-DAW</a></span>
                        <span class="accio"><a href="https://10.20.9.253/admin">2SMX</a></span>
                        <span class="accio"><a href="https://10.20.10.253/admin">1SMX</a></span>
						<span class="accio"><a href="https://10.20.14.253/admin">1DAM-DAW</a></span>
						<span class="accio"><a href="https://10.20.13.253/admin">1ASIX-2ASIX</a></span>
                        
			<h1 style="font-size:1em;">Dades server</h1>
			<ul id="dades_server">
				<li>IP actual: <span id="ipactual"><?php  echo $_SERVER['SERVER_ADDR']; ?></span></li>
				<li>IP eth1: <span id="ipeth1"> <?php echo $localIP; ?></span></li>
				<li>IP eth0: <span id="ipeth0"> <?php echo $externalIP; ?></span></li>
				
			</ul>
                        <span id="pausar">⏸</span><progress id="progress_actualizar" value="22" max="100">
		</div>
		<div id="derecha">
			<div id="net">
				<div id="div_graphxarxa"><img id="graphxarxa" src="images/graph/output.png"/></div>
				<div id="info_graphxarxa" class="info">
					<p>La targeta eth0 és la externa i la eth1 la interna.
						En general ens interessa la línia de Entrada mitjana,
						ja que marca el consum que fan tots els alumnes.
						El gràfic está en KBits/s. </br>
						Per exemple, si marca, de mitja, 3000, vol dir que l'aula sencera 
						està consumint 3MBits/s. 
					</p>
				</div>
			</div>
			<div id="contingut">
				<div id="panel"> 
				</div>

				<div id="estadistiques">
					<span id="ocultar_seleccionar">Seleccionar Clients</span>
					<div id="seleccionar_clientes">
						<?php
						$nums = explode(".", $localIP) ;
						$prefix = $nums[0]. "." .$nums[1]. "." .$nums[2] ; 
						for($i=1;$i<250;$i++){
						echo "<label class='input_container'>".$prefix.".".$i."<input id='seleccionar_clients_".$prefix.".".$i."' type='checkbox' value='".$i."'><span class='checkmark'></span></label>";
						}
						?>
					</div>	
					<div id="estadistiques_hora"></div>
						6 Hores:
					<div id="estadistiques_hui"></div>
						6 dies:
					<div id="estadistiques_setmana"></div>
				</div>
			</div>
		</div>
	</div>
	<div id="actual"></div>
<?php
}
}
else {
?>
 <form action="index.php" method="post">

  <div class="container">
    <label><b>Usuari</b></label>
    <input type="text" placeholder="Usuari" name="uname" required>

    <label><b>Password</b></label>
    <input type="password" placeholder="Password" name="psw" required>

    <button type="submit">Login</button>
    <!-- <input type="checkbox" checked="checked"> Remember me -->
  </div>

  <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="cancelbtn">Cancelar</button>
  </div>
</form>
<?php
}
?>
</div>
</body>

</html>
