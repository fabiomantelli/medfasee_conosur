<?php
session_start();

$acao = $_POST['acao'];


if ($acao == 'gravarSessaoChile'){
	$_SESSION['referencia'] = $_POST['referencia'];
	echo $_SESSION['referencia'];

}

if ($acao == 'lerSessaoChile'){
	echo $_SESSION['referencia'];
	exit;

}


if ($acao == 'gravarSessaoArgentina'){
	$_SESSION['referenciaArgentina'] = $_POST['referenciaArgentina'];
	echo $_SESSION['referenciaArgentina'];

}

if ($acao == 'lerSessaoArgentina'){
	echo $_SESSION['referenciaArgentina'];
	exit;

}
?>