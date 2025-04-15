const form = document.getElementById("formJadwal");
const listJadwal = document.getElementById("listJadwal");
const selectHari = document.getElementById("hari");

let jadwalData = [];
let editId = null;

selectHari.addEventListener("change", () => {
  tampilkanJadwal(selectHari.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const hari = document.getElementById("hari").value;
  const jam = document.getElementById("jam").value;
  const kelas = document.getElementById("kelas").value;
  const mapel = document.getElementById("mapel").value;
  const link = document.getElementById("link").value;

  if (!hari || !jam || !kelas || !mapel) {
    alert("Hari, Jam, Kelas, dan Mata Pelajaran wajib diisi.");
    return;
  }

  const data = { hari, jam, kelas, mapel, link };

  if (editId) {
    data.id = editId;
    fetch("../api/edit_jadwal.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      editId = null;
      form.reset();
      tampilkanJadwal(hari);
    });
  } else {
    fetch("../api/tambah_jadwal.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      form.reset();
      tampilkanJadwal(hari);
    });
  }
});

function tampilkanJadwal(hari) {
  fetch(`../api/ambil_jadwal.php?hari=${hari}`)
    .then((res) => res.json())
    .then((data) => {
      jadwalData = data;
      if (data.length === 0) {
        listJadwal.innerHTML = "<p>Tidak ada jadwal untuk hari ini.</p>";
        return;
      }

      listJadwal.innerHTML = "";
      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "jadwal-card";
        card.innerHTML = `
          <h3>${item.mapel}</h3>
          <p><strong>Jam:</strong> ${item.jam}</p>
          <p><strong>Kelas:</strong> ${item.kelas}</p>
          ${
            item.link
              ? `<p><a href="${item.link}" target="_blank">🔗 Link</a></p>`
              : ""
          }
          <div class="actions">
            <button class="edit-btn" onclick="editJadwal(${
              item.id
            })">Edit</button>
            <button class="delete-btn" onclick="hapusJadwal(${
              item.id
            })">Hapus</button>
          </div>
        `;
        listJadwal.appendChild(card);
      });
    });
}

window.editJadwal = function (id) {
  const item = jadwalData.find((j) => j.id == id);
  if (!item) return;

  document.getElementById("jam").value = item.jam;
  document.getElementById("kelas").value = item.kelas;
  document.getElementById("mapel").value = item.mapel;
  document.getElementById("link").value = item.link || "";
  selectHari.value = item.hari;
  editId = id;
};

window.hapusJadwal = function (id) {
  if (confirm("Yakin ingin menghapus jadwal ini?")) {
    fetch(`../api/hapus_jadwal.php?id=${id}`).then(() =>
      tampilkanJadwal(selectHari.value)
    );
  }
};

window.addEventListener("DOMContentLoaded", () => {
  tampilkanJadwal(selectHari.value || "senin");
});
