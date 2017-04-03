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
	<script src="js/jquery.peity.min.js"></script>
	<script src="js/scripts.js"></script>
	<div id="contenedor">
<?php 
if(isset($_SESSION['user'])){
if($_SESSION['user']=='lliurex'){

?>
		<div id="accions">
			<h1 id="control">Control d'Aula</h1>
			<span class="accio" id="btots">Bloquejar a tots</span>
			<span class="accio" id="dtots">Desbloquejar a tots</span>
			<span class="accio" id="ralentir">Ralentir Internet als alumnes<input type="number" id="velocitat" value="3000"/></span>
			<span class="accio" id="reset">Velocitat estandard per a tots</span>
			<h1 style="font-size:1em;" id="totes">Totes les aules</h1>
                        <span class="accio"><a href="https://10.20.8.254/admin">2DAM-ASIX</a></span>
                        <span class="accio"><a href="https://10.20.9.254/admin">2SMX</a></span>
                        <span class="accio"><a href="https://10.20.10.254/admin">1SMX</a></span>
                        <span class="accio"><a href="https://10.20.14.254/admin">1DAM-ASIX</a></span>
		</div>
		<div id="derecha">
			<div id="net">
				<div class="nic" id="eth0in"><span class="nic">eth2<br/>In:</span>
					<span class="line"></span>
					<span id="min" class="max">100</span>
				</div>
				<div class="nic" id="eth0out"><span class="nic">eth2<br/>Out:</span>
					<span class="line"></span>
					<span id="mout" class="max">100</span>
				</div>
				<div style="clear:both;"></div>
			</div>
			<div id="panel"> </div>
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
