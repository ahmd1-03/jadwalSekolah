const hariList = [
  "minggu",
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jumat",
  "sabtu",
];

const today = new Date();
const hariIni = hariList[today.getDay()];
document.getElementById("tanggal").textContent = today.toLocaleDateString(
  "id-ID",
  {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
);

// 🔥 CUACA REAL-TIME (dengan OpenWeatherMap)
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const apiKey = "270aded85f706c8dde39623b1b90e3d8";

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const suhu = data.main.temp;
          const kondisi = data.weather[0].description;
          const kota = data.name;
          document.getElementById(
            "info-cuaca"
          ).textContent = `${kondisi} di ${kota}, suhu ${suhu}°C`;
        })
        .catch((err) => {
          document.getElementById("info-cuaca").textContent =
            "Gagal memuat cuaca.";
          console.error("Cuaca error:", err);
        });
    },
    (err) => {
      document.getElementById("info-cuaca").textContent =
        "Lokasi tidak diizinkan.";
    }
  );
} else {
  document.getElementById("info-cuaca").textContent =
    "Browser tidak mendukung lokasi.";
}

// ✅ AMBIL SEMUA JADWAL DARI SERVER
fetch("../api/ambil_semua_jadwal.php")
  .then((res) => res.json())
  .then((data) => {
    const jadwalHariIni = data.filter((j) => j.hari === hariIni);
    tampilkanJadwal("jadwal-hari", jadwalHariIni);

    const semuaJadwal = {};
    data.forEach((item) => {
      if (!semuaJadwal[item.hari]) semuaJadwal[item.hari] = [];
      semuaJadwal[item.hari].push(item);
    });

    let html = "";
    hariList.forEach((hari) => {
      if (semuaJadwal[hari]) {
        html += `<h3 style="text-transform:capitalize">${hari}</h3>`;
        semuaJadwal[hari].forEach((item) => {
          html += buatCard(item);
        });
      }
    });
    document.getElementById("semua-jadwal").innerHTML = html;
  })
  .catch((err) => {
    console.error("Gagal memuat jadwal:", err);
  });

function tampilkanJadwal(containerId, data) {
  const el = document.getElementById(containerId);
  if (data.length === 0) {
    el.innerHTML = "<p>Tidak ada jadwal hari ini.</p>";
    return;
  }
  el.innerHTML = data.map((item) => buatCard(item)).join("");
}

function buatCard(item) {
  return `
    <div class="card-jadwal">
      <strong>${item.jam}</strong><br>
      <span>Kelas: ${item.kelas}</span><br>
      <span>Mapel: ${item.mapel}</span><br>
      ${item.link ? `<a href="${item.link}" target="_blank">🔗 Link</a>` : ""}
    </div>
  `;
}
