<?php
if(isset($_POST['token'])){

$state = openssl_decrypt ($_POST['clef'],'aes128', 'm1miage', false, '1234567812345678');

if ($state != false){
$cookies = explode(";",$state);
setcookie('keydone', $cookies[0]);
setcookie('nb_traite', $cookies[1]);
setcookie('nb_max', $cookies[2]);
$state = 'true';
}

echo json_encode($state);
}
?>