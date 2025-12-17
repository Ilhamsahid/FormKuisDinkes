<?php

$host = 'localhost';
$user = 'root';
$pass = 'root';
$db   = 'survei_kepuasan';
$port = 6606; //custom port

$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die('Koneksi gagal: ' . $conn->connect_error);
}
