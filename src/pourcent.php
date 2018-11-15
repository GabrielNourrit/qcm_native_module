<?php
//calcul l'etat d'avancement du questionnaire

if(isset($_POST['token'])){
	$res = 0;
	$nb = intval($_COOKIE['nbmax']);
	$fait = intval($_COOKIE['nb_traite']);
	if($fait!="0")
		$res = round(($fait/$nb)*100.0,2);
	echo json_encode($res."%"); 
}

?>