<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	$text = "";
	foreach ($_REQUEST as $key => $value) {
		if ($key == "TipoDeContacto") {
			if ($value == "0") {
				$value = "Sin especificar";
			} else if ($value == "1") {
				$value = "Consulta";
			} else if ($value == "2") {
				$value = "Queja";
			}
		}
		$text .= "<b>$key</b>: $value<br>";
	}
	$to = "ciqa@ciqa.com.ar";
	//$to = "gezeac@gmail.com";
	$subject = "Contacto Web CIQA";

	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	mail($to,$subject,$text,$headers);

	$arch = fopen("/home/nuvantvh/ciqaBackend.diezweb.com.ar/contactosCiqa.txt", "a");
	fwrite($arch, $text."\n\n");

	echo '{"mensaje":"¡GRACIAS POR ESCRIBIRNOS! En breve estaremos respondiendo tu consulta."}';
?>
