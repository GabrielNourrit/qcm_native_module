<?php

if(isset($_POST['token'])){

if(isset($_COOKIE["keydone"]) && isset($_COOKIE["nb_traite"]) && isset($_COOKIE["nbmax"])){
$save = $_COOKIE["keydone"].';'.$_COOKIE["nb_traite"].';'.$_COOKIE["nbmax"];
 
 $r = openssl_encrypt ($save, 'aes128', 'm1miage', false, '1234567812345678');

echo json_encode($r);
}else
	echo "0";
}

?>