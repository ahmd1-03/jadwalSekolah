const form = document.getElementById("formJadwal");
const listJadwal = document.getElementById("listJadwal");
const selectHari = document.getElementById("hari");

// Tambah atau update (mode edit)
let editIndex = -1;
let editHari = "";

// Saat memilih hari, tampilkan jadwal
selectHari.addEventListener("change", () => {
  tampilkanJadwal(selectHari.value);
});

// Saat form disubmit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const hari = document.getElementById("hari").value;
  const jam = document.getElementById("jam").value;
  const mapel = document.getElementById("mapel").value;
  const kelas = document.getElementById("kelas").value;
  const link = document.getElementById("link").value;

  if (!hari || !jam || !mapel || !kelas) {
    alert("Lengkapi semua kolom wajib!");
    return;
  }

  const jadwal = ambilJadwal();
  if (!jadwal[hari]) jadwal[hari] = [];

  const dataBaru = { jam, mapel, kelas, link };

  if (editIndex !== -1) {
    // Edit mode
    jadwal[editHari][editIndex] = dataBaru;
    editIndex = -1;
    editHari = "";
  } else {
    // Tambah data baru
    jadwal[hari].push(dataBaru);
  }

  simpanJadwal(jadwal);
  tampilkanJadwal(hari);
  form.reset();
});

// Ambil dari localStorage
function ambilJadwal() {
  return JSON.parse(localStorage.getItem("jadwalSekolah")) || {};
}

// Simpan ke localStorage
function simpanJadwal(data) {
  localStorage.setItem("jadwalSekolah", JSON.stringify(data));
}

// Tampilkan semua jadwal dari hari yang dipilih
function tampilkanJadwal(hari) {
  const jadwal = ambilJadwal();
  const hariJadwal = jadwal[hari] || [];

  if (hariJadwal.length === 0) {
    listJadwal.innerHTML = "<p>Belum ada jadwal.</p>";
    return;
  }

  let html = "";
  hariJadwal.forEach((item, index) => {
    html += `
      <div class="jadwal-card">
        <p><strong>Jam:</strong> ${item.jam}</p>
        <p><strong>Kelas:</strong> ${item.kelas}</p>
        <p><strong>Mata Pelajaran:</strong> ${item.mapel}</p>
        ${
          item.link
            ? `<p><strong>Link:</strong> <a href="${item.link}" target="_blank">Buka</a></p>`
            : `<p><strong>Link:</strong> <em>Tidak ada</em></p>`
        }
        <div class="actions">
          <button class="edit-btn" onclick="editJadwal('${hari}', ${index})">Edit</button>
          <button class="delete-btn" onclick="hapusJadwal('${hari}', ${index})">Hapus</button>
        </div>
      </div>
    `;
  });

  listJadwal.innerHTML = html;
}

// Hapus jadwal
function hapusJadwal(hari, index) {
  const jadwal = ambilJadwal();
  if (!jadwal[hari]) return;

  jadwal[hari].splice(index, 1);
  simpanJadwal(jadwal);
  tampilkanJadwal(hari);
}

// Edit jadwal
function editJadwal(hari, index) {
  const jadwal = ambilJadwal();
  const data = jadwal[hari][index];

  document.getElementById("hari").value = hari;
  document.getElementById("jam").value = data.jam;
  document.getElementById("mapel").value = data.mapel;
  document.getElementById("kelas").value = data.kelas;
  document.getElementById("link").value = data.link || "";

  editIndex = index;
  editHari = hari;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Load awal
window.addEventListener("DOMContentLoaded", () => {
  tampilkanJadwal(selectHari.value);
});
