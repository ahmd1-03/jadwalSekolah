<?php
$servername = "localhost";
$username = "root"; // Ganti dengan username database Anda
$password = ""; // Ganti dengan password database Anda
$dbname = "jadwal_sekolah";

// Membuat koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$hari = $_GET['hari'];

// Menyiapkan query untuk mengambil jadwal berdasarkan hari
$sql = "SELECT * FROM jadwal WHERE hari = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $hari);
$stmt->execute();
$result = $stmt->get_result();

// Mengambil semua hasil dan mengonversi ke format JSON
$jadwal = [];
while ($row = $result->fetch_assoc()) {
  $jadwal[] = $row;
}

echo json_encode($jadwal);

$stmt->close();
$conn->close();
?>
