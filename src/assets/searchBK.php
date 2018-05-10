<?php
$search_string = $_REQUEST['search_string'];


$handle = fopen("service_search.csv", "r");
$result = [];
$found;

if ($handle) {
	while ($line = fgets($handle)) {
		$line_array = explode("~",$line);
		for ($i=0; $i < count($line_array); $i++) { 
			$line_array[$i] = preg_replace('~[\r\n]+~', '', $line_array[$i]);
		}
		$search_string_arr = explode(" ", $search_string);

		for ($i=0; $i < count($search_string_arr); $i++) { 
			$found = false;
			if ( is_int(stripos($line_array[0], $search_string_arr[$i])) ) {
				for ($f=0; $f < count($result); $f++) { 
					if ($result[$f]["resultado"] == $line_array[1]) {
						$result[$f]["orden"] = $result[$f]["orden"] + 1;
						$found = true;
						break;
					}
				}
				if (!$found) {
					array_push($result,["resultado" => $line_array[1], "orden" => 1, "titulo" => $line_array[2]]);
					$found = false;
				}
			}
		}
	}
	fclose($handle);
} else {
	$result = [["resultado" => "Ocurrió un error leyendo el archivo"]];
} 

if ($result == []) {
	$result = [["resultado" => "No se encontraron resultados"]];
}
echo json_encode($result);
?>	