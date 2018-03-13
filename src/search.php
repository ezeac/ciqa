<?php
$search_string = $_REQUEST['search_string'];
$search_string = "aire";
$handle = fopen("assets/service_search.csv", "r");
$result = "{'resultado': 'No se encontraron resultados'}";
if ($handle) {
	while ($line = fgets($handle)) {
		$line_array = explode("~",$line);
		$line_array_var = explode(":",$line_array[0]);
		for ($i=0; $i < count($line_array_var); $i++) { 
			if (is_int(stripos($search_string, $line_array_var[$i]))) {
				$result = "{'resultado': '".$line_array[1]."'}";
				break;
			}
		}
	}
	fclose($handle);
} else {
	$result = "{'resultado': 'Ocurrió un error leyendo el archivo'}";
} 
echo $result;
?>