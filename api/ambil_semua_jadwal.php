<?php
header('Content-Type: application/json');
require '../config/koneksi.php';

$query = $conn->query("SELECT * FROM jadwal ORDER BY FIELD(hari, 'senin','selasa','rabu','kamis','jumat','sabtu','minggu'), jam");
$result = [];
while ($row = $query->fetch_assoc()) {
  $result[] = $row;
}
echo json_encode($result);
?>
