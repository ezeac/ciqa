<?php
	error_reporting(0);

	$text = "";
	foreach ($_REQUEST as $key => $value) {
		$text .= "<b>$key</b>: $value<br>";
		if ($key == "nombre") {
			$nombre = $value;
		}
		if ($key == "email") {
			$email = $value;
		}
		if ($key == "mensaje") {
			$mensaje = $value;
		}
		if ($key == "tel") {
			$tel = $value;
		}
	}

	$to = "gezeac@gmail.com, ciqa@ciqa.com.ar";
	$subject = "Contacto Web CIQA";

	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	mail($to,$subject,$text,$headers);

	$arch = fopen("/var/www/html/contactos.txt", "a");
	fwrite($arch, $text."\n\n");

	echo '{"mensaje":"¡GRACIAS POR ESCRIBIRNOS! En breve estaremos respondiendo tu consulta."}';
?>
