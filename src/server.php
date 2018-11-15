<?php

include 'db.php';

if(isset($_POST['token'])){
	setcookie('nbmax',$NB);

if(!isset($_COOKIE['keydone'])){
$selected = rand(0,$NB-1);
$object_selected = $DB[$selected.""];
$key_selected = $object_selected["id"];

setcookie("keydone",$key_selected);
setcookie("nb_traite",1);

echo json_encode($object_selected);
}else{
	if(intval($_COOKIE["nb_traite"])>=$NB)
		echo json_encode("probleme");
	else{
	$keydones_tab = explode("s",$_COOKIE['keydone']);
	foreach($keydones_tab as $keydone)
		unset($DB[$keydone]);
	$DB = array_values($DB);

	$size = intval($NB)-(intval($_COOKIE['nb_traite'])+1);
	$selected = rand(0,$size);
	
	$object_selected = $DB[$selected.""];
	$key_selected = $object_selected["id"];

	setcookie("keydone",$_COOKIE["keydone"]."s".$key_selected);
	setcookie("nb_traite",intval($_COOKIE["nb_traite"])+1);
	echo json_encode($object_selected);
}
}
}

?>