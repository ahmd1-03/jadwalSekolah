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

$data = json_decode(file_get_contents("php://input"), true);

// Menyiapkan query untuk menambahkan data jadwal
$sql = "INSERT INTO jadwal (hari, jam, kelas, mapel, link) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $data['hari'], $data['jam'], $data['kelas'], $data['mapel'], $data['link']);

// Menjalankan query
if ($stmt->execute()) {
  echo json_encode(["status" => "success", "message" => "Jadwal berhasil ditambahkan."]);
} else {
  echo json_encode(["status" => "error", "message" => "Gagal menambahkan jadwal."]);
}

$stmt->close();
$conn->close();
?>
