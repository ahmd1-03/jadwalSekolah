const hariMap = [
  "minggu",
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jumat",
  "sabtu",
];
const hariIni = hariMap[new Date().getDay()];
document.getElementById("namaHari").textContent = `Hari ini: ${capitalize(
  hariIni
)}`;

fetch("http://localhost:3000/api/jadwal")
  .then((response) => response.json())
  .then((data) => {
    const jadwal = data[hariIni] || [];
    tampilkanJadwal(jadwal);
  })
  .catch((error) => {
    console.error("Gagal memuat data jadwal:", error);
  });

function tampilkanJadwal(jadwal) {
  const container = document.getElementById("jadwalHariIni");
  if (jadwal.length === 0) {
    container.innerHTML = "<p>Tidak ada jadwal hari ini.</p>";
    return;
  }

  const list = document.createElement("ul");
  jadwal.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.jam}</strong> - ${item.mapel} - <a href="${item.link}" target="_blank">Masuk Kelas</a>`;
    list.appendChild(li);
  });
  container.appendChild(list);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
