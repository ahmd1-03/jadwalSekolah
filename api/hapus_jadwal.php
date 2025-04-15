<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "jadwal_sekolah";

// Koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Ambil ID dari parameter URL
$id = $_GET['id'] ?? null;

if (!$id) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "ID tidak diberikan."]);
  exit;
}

// Hapus jadwal berdasarkan ID
$sql = "DELETE FROM jadwal WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(["status" => "success", "message" => "Jadwal berhasil dihapus."]);
} else {
  echo json_encode(["status" => "error", "message" => "Gagal menghapus jadwal."]);
}

$stmt->close();
$conn->close();
?>
