<?php
    // envío de fecha: {ts '2018-05-28 00:00:00'}
    //$sql = "SELECT top 1 replace(replace(replace(replace(replace(convert(nvarchar(max),parametro2),'ó','o'),'á','a'),'é','e'),'í','i'),'ú','u') as parametro2 FROM peticionesservidor where peticion = 202"; $serverName = "172.16.35.69"; $connectionOptions = array("Database" => "syslab","Uid" => "webciqa","PWD" => "Ciqa2019"); $con = sqlsrv_connect($serverName, $connectionOptions); if($con) { echo "Connected!"; } else { echo "not connected"; } $result = sqlsrv_query($con, $sql);
    // $sql = "SELECT top 1 replace(replace(replace(replace(replace(convert(nvarchar(max),parametro2),'ó','o'),'á','a'),'é','e'),'í','i'),'ú','u') as parametro2 FROM peticionesservidor where peticion = 202"; $serverName = "172.16.35.69"; $connectionOptions = array("Database" => "syslab","Uid" => "webciqa","PWD" => "Ciqa2019"); $con = sqlsrv_connect($serverName, $connectionOptions); if($con) { echo "Connected!"; } else { echo "not connected"; } $result = sqlsrv_query($con, $sql); while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)){echo $row["parametro2"];}
    // $sql = "SELECT ORDINAL_POSITION, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'peticionesservidor'"; $serverName = "172.16.35.69"; $connectionOptions = array("Database" => "syslab","Uid" => "webciqa","PWD" => "Ciqa2019"); $con = sqlsrv_connect($serverName, $connectionOptions); if($con) { echo "Connected!"; } else { echo "not connected"; } $result = sqlsrv_query($con, $sql); while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)){print_r($row);}
    // ESTADO = 0 espera, 1 procesando, 2 terminado, 3 error
    // client 6, nom cliente 40, desc 50 , status peticion 100, geolocalizacion memo

    $serverName = "172.16.35.69"; 
    $connectionOptions = array("Database" => "syslab","Uid" => "webciqa","PWD" => "Ciqa2019");
    $con = sqlsrv_connect($serverName, $connectionOptions);

    $nroPeticion = $_REQUEST["peticion"];
    if ($nroPeticion == null) { die("Se debe ingresar un nro de petición"); }

    $idExterna = time();
    $parametrosExtras = "";
    foreach ($_REQUEST as $key => $value) {
        if ($key != "peticion") {
            $parametrosExtras .= "<".$key.">".$value."</".$key.">";
        }
    }

    $parametros = "<?xml version = \"1.0\" encoding=\"Windows-1252\" standalone=\"yes\"?><VFPData><parametro1><peticion>".$nroPeticion."</peticion>".$parametrosExtras."</parametro1></VFPData>";
    $sql = "INSERT INTO peticionesservidor (peticion, idexterna, estado, fecha, parametro1) VALUES (".$nroPeticion.", '".$idExterna."', 0, GETDATE(), '".$parametros."')";
  
    //$sql = str_replace("<", "&lt;", $sql);
    //die($sql);
    
    $result = sqlsrv_query($con, $sql);

    $sql = "SELECT idexterna, estado, replace(replace(replace(replace(replace(convert(nvarchar(max),parametro2),'ó','o'),'á','a'),'é','e'),'í','i'),'ú','u') as parametro2 FROM peticionesservidor WHERE idexterna = '".$idExterna."'";
    $estado = 0;
    $count = 0;
    $resultado = "";
    while ($estado < 2) {
        $result = sqlsrv_query($con, $sql);
        while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
            $estado = $row["estado"];
            if ($estado > 1) {
                $resultado = $row["parametro2"];
            }
        }
        $count++;
        if ($count > 100) {
            die ("No se pudo obtener una respuesta a la petición. ID: ".$idExterna);
        }
        sleep(1);
    }

    $resultado = str_replace("<![CDATA[", "", $resultado);
    $resultado = str_replace("]]>", "", $resultado);
    $xml = simplexml_load_string($resultado);
    $json = json_encode($xml);

    // $json = json_decode($json);

    // var_dump($json);
    // die();
    // if ($nroPeticion == "202") {
    //     for ($i=0; $i < count($json["_parametro2"]); $i++) { 
    //         $src = $json["_parametro2"][$i]["geolocalizacion"];
    //         preg_match('/(?<=\/@)(.)*?(?=,)/g', $src, $matches);
    //         preg_match('/(?<=,)(.)*?(?=,)/g', $src, $matches2);
    //         if (isset($matches[0]) && isset($matches2[0])) {
    //             $json["_parametro2"][$i]["lat"] = $matches[0];
    //             $json["_parametro2"][$i]["long"] = $matches2[0];
    //         }
    //     }
    // }


    if ($error) {
        echo $error;
    } else {
        echo $json;
    }
    
?>
