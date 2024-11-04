<?php
$servername = "sql305.infinityfree.com";
// REPLACE with your Database name
$dbname = "if0_37562183_iotdatabasestm";
// REPLACE with Database user
$username = "if0_37562183";
// REPLACE with Database user password
$password = "0339656147";

// Keep this API Key value to be compatible with the ESP32 code provided in the project page. 
// If you change this value, the ESP32 sketch needs to match
$api_key_value = "tPmAT5Ab3j7F9";

$api_key= $sensor = $location = $temperature = $pressure = $altitude = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key = test_input($_POST["api_key"]);
    if($api_key == $api_key_value) {
        $humidity = test_input($_POST["humidity"]);
        $location = test_input($_POST["location"]);
        $temperature = test_input($_POST["temperature"]);
        $pressure = test_input($_POST["pressure"]);
        $altitude = test_input($_POST["altitude"]);
        
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        
        $sql = "INSERT INTO SensorMeasurements (sensor, location, temperature, pressure, altitude)
        VALUES ('" . $sensor . "', '" . $location . "', '" . $temperature . "', '" . $pressure . "', '" . $altitude . "')";
        
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } 
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    
        $conn->close();
    }
    else {
        echo "Wrong API Key provided.";
    }

}
else {
    echo "No data posted with HTTP POST.";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>