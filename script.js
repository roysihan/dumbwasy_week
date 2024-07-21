document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    const name = document.getElementById("name").value; // Mengambil nilai input nama
    const startDate = new Date(document.getElementById("startDate").value); // Mengambil dan mengonversi nilai input tanggal mulai menjadi objek Date
    const endDate = new Date(document.getElementById("endDate").value); // Mengambil dan mengonversi nilai input tanggal akhir menjadi objek Date
    const message = document.getElementById("message").value; // Mengambil nilai textarea pesan
    const technologies = Array.from(
      document.querySelectorAll('input[name="technologies"]:checked')
    ).map((el) => el.value); // Mengambil nilai checkbox yang dipilih dan mengonversinya menjadi array
    const imageUpload = document.getElementById("imageUpload").files[0]; // Mengambil file gambar yang diunggah

    // Menghitung durasi dalam hari
    const durationInDays = Math.round(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );
    const durationInMonths = Math.floor(durationInDays / 30); // Menghitung durasi dalam bulan
    const durationInWeeks = Math.floor((durationInDays % 30) / 7); // Menghitung sisa durasi dalam minggu
    const durationText =
      durationInMonths > 0
        ? `${durationInMonths} month${durationInMonths > 1 ? "s" : ""}`
        : ""; // Membuat teks durasi dalam bulan
    const durationWeeksText =
      durationInWeeks > 0
        ? `${durationInWeeks} week${durationInWeeks > 1 ? "s" : ""}`
        : ""; // Membuat teks durasi dalam minggu
    const durationFinalText =
      durationText && durationWeeksText
        ? `${durationText} and ${durationWeeksText}`
        : durationText || durationWeeksText; // Menggabungkan teks durasi bulan dan minggu

    const reader = new FileReader(); // Membuat objek FileReader untuk membaca file gambar
    reader.onload = function (e) {
      const imgSrc = e.target.result; // Mengambil URL data dari hasil pembacaan file

      const projectList = document.getElementById("submissionList"); // Mengambil elemen list proyek
      const projectCard = document.createElement("div"); // Membuat elemen div baru untuk kartu proyek
      projectCard.className = "project-card"; // Menambahkan kelas CSS untuk kartu proyek

      projectCard.innerHTML = `
        <img src="${imgSrc}" alt="Project Image">
        <div class="project-card-body">
          <h3>${name}</h3>
          <p>Duration: ${durationFinalText}</p>
          <div class="project-detail">
            <p>${message}</p>
            <p>Technologies: ${technologies.join(", ")}</p>
          </div>
        </div>
        <div class="project-card-footer">
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </div>
      `; // Menambahkan konten HTML ke kartu proyek, termasuk gambar, nama, durasi, pesan, teknologi, dan tombol edit dan delete

      projectList.appendChild(projectCard); // Menambahkan kartu proyek ke dalam list proyek

      // Menambahkan event listener untuk toggle detail proyek
      projectCard.addEventListener("click", function () {
        const detail = projectCard.querySelector(".project-detail");
        detail.classList.toggle("active");
      });

      // Menambahkan event listener untuk tombol delete
      projectCard
        .querySelector(".delete-button")
        .addEventListener("click", function (e) {
          e.stopPropagation(); // Mencegah event click pada kartu proyek
          projectCard.remove(); // Menghapus kartu proyek
        });

      // Mengatur ulang form
      document.getElementById("contactForm").reset();
    };

    if (imageUpload) {
      reader.readAsDataURL(imageUpload); // Membaca file gambar sebagai URL data
    }
  });
