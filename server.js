const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Middleware untuk melayani file statis seperti HTML, CSS, JS
app.use(express.static(path.join(__dirname, "public"))); // Folder 'public' untuk file statis

app.use(express.json()); // Untuk menerima data JSON

// Endpoint untuk mengambil data jadwal
app.get("/api/jadwal", (req, res) => {
  fs.readFile("jadwal.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Gagal membaca file" });
    }
    res.json(JSON.parse(data)); // Mengirim data jadwal dalam format JSON
  });
});

// Endpoint untuk menyimpan data jadwal
app.post("/api/jadwal", (req, res) => {
  const newJadwal = req.body; // Data jadwal yang diterima dari frontend

  // Simpan data jadwal ke file jadwal.json
  fs.writeFile("jadwal.json", JSON.stringify(newJadwal, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Gagal menyimpan data" });
    }
    res.status(200).json({ message: "Jadwal berhasil disimpan" });
  });
});

// Menambahkan route untuk menampilkan admin.html ketika mengakses root (/)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html")); // Menunjuk ke admin.html di folder public
});

// Menjalankan server di port 3000
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
