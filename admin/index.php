<?php 
session_start();

if($_POST['uname'] && $_POST['psw'])
{

if($_POST['psw']=='lliurex'){
$_SESSION['user']='lliurex';
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

if($_SESSION['user']=='lliurex'){

?>
	<div id="accions">
	
<h1>Control d'Aula</h1>
	<span class="accio" id="btots">Bloquejar a tots</span>
	<span class="accio" id="dtots">Desbloquejar a tots</span>
	<span class="accio" id="ralentir">Ralentir Internet als alumnes<input type="number" id="velocitat" value="3000"/></span>
	<span class="accio" id="reset">Velocitat estandard per a tots</span>
	</div>
<div id="derecha">
<div id="net">
<div class="nic" id="eth0in"><span class="nic">eth2<br/>In:</span>
<span class="line">0.05,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,2.18,1.02,0.00,1.92,1.63,0.00,0.00,0.00,0.00,0.74,0.74,0.74,1.64,0.13,0.89,0.00,0.00,0.89,1.47,0.74,0.74,0.73,0.83,1.77,0.87,0.87,0.00,0.74,2.06,1.47,0.00,0.74,1.47,0.74,1.00,0.00,0.74,0.00,0.00,0.49</span>
<span id="min" class="max">100</span>
</div>
<div class="nic" id="eth0out"><span class="nic">eth2<br/>Out:</span>
<span class="line">0.05,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,2.18,1.02,0.00,1.92,1.63,0.00,0.00,0.00,0.00,0.74,0.74,0.74,1.64,0.13,0.89,0.00,0.00,0.89,1.47,0.74,0.74,0.73,0.83,1.77,0.87,0.87,0.00,0.74,2.06,1.47,0.00,0.74,1.47,0.74,1.00,0.00,0.74,0.00,0.00,0.49</span>

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
