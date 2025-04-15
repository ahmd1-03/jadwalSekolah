<?php
$servername = "localhost";
$username = "root"; // Ganti sesuai konfigurasi MySQL kamu
$password = ""; // Ganti sesuai konfigurasi MySQL kamu
$dbname = "jadwal_sekolah";

// Koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Ambil data JSON dari body
$data = json_decode(file_get_contents("php://input"), true);

// Validasi data
if (!isset($data['id'], $data['hari'], $data['jam'], $data['kelas'], $data['mapel'])) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "Data tidak lengkap."]);
  exit;
}

// Update data berdasarkan ID
$sql = "UPDATE jadwal SET hari = ?, jam = ?, kelas = ?, mapel = ?, link = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $data['hari'], $data['jam'], $data['kelas'], $data['mapel'], $data['link'], $data['id']);

if ($stmt->execute()) {
  echo json_encode(["status" => "success", "message" => "Jadwal berhasil diperbarui."]);
} else {
  echo json_encode(["status" => "error", "message" => "Gagal memperbarui jadwal."]);
}

$stmt->close();
$conn->close();
?>
