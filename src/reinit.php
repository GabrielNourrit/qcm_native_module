<?php

if(isset($_POST['token'])){
	if(isset($_COOKIE["keydone"])){
 $cookies = ['keydone', 'nb_traite', 'nbmax'];

 foreach($cookies as $c){
// Suppression du fichier cookie
setcookie($c, '');
// Suppression de la valeur du cookie en mémoire dans $_COOKIE
unset($_COOKIE[$c]);
}
}
}
?>