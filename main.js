class Mobil {
  constructor(gambar) {
    this.posisiSaatIni = 0;
    this.gambar = document.querySelector(gambar);
    this.gambar.style.top = 0;
  }

  pindahPosisi(angka) {
    const posisiBaru = this.posisiSaatIni + angka;

    // Jika posisi baru melebihi 20, maka tidak boleh pindah
    if (posisiBaru > 20) {
      return; // Berhenti eksekusi disini
    }

    // Kode untuk ubah posisi
    this.posisiSaatIni = posisiBaru;

    // Untuk membuat animasi perpindahan mobil
    this.gambar.style.top = `${this.posisiSaatIni * 100}px`;
  }
}

class Game {
  constructor() {
    this.mobilAnda = new Mobil(".mobil-anda-section .gambar-mobil");
    this.mobilRobot = new Mobil(".mobil-robot-section .gambar-mobil");
    this.giliran = "anda"; // Nilai ini hanya boleh "anda" atau "robot"

    this.controlKeterangan = document.querySelector(
      "#game-control .keterangan"
    );
    this.controlKeterangan.textContent = "Giliran Anda";

    this.controlAngka = document.querySelector("#game-control .angka");
    this.controlAngka.textContent = 0;

    this.controlButton = document.querySelector("#game-control button");
    this.controlButton.style.display = null;

    this.controlButton.addEventListener("click", () => {
      this.controlButton.style.display = "none";

      this.acakAngka();
    });
  }

  acakAngka() {
    this.controlAngka.style.color = "#fff";

    let angka;
    const interval = setInterval(() => {
      angka = Math.ceil(Math.random() * 5); // Random 1-5

      this.controlAngka.textContent = angka;
    }, 50); // 50 = 0.05 detik

    // Interval berhenti di detik ke-2
    setTimeout(() => {
      clearInterval(interval);

      this.controlAngka.style.color = null;

      this.tampilkanHasil(angka);
    }, 2000); // 2000 = 2 detik
  }

  tampilkanHasil(angka) {
    if (this.giliran === "anda") {
      this.mobilAnda.pindahPosisi(angka);
    } else if (this.giliran === "robot") {
      this.mobilRobot.pindahPosisi(angka);
    }

    setTimeout(() => {
      if (this.giliran === "anda" && this.mobilAnda.posisiSaatIni === 20) {
        this.tampilkanPemenang();
        return;
      } else if (
        this.giliran === "robot" &&
        this.mobilRobot.posisiSaatIni === 20
      ) {
        this.tampilkanPemenang();
        return;
      }

      // Kode dibawah untuk mengubah giliran
      if (this.giliran === "anda") {
        this.giliran = "robot";

        this.controlKeterangan.textContent = "Giliran Robot";

        // Robot langsung mengacak angkanya
        this.acakAngka();
      } else if (this.giliran === "robot") {
        this.giliran = "anda";

        this.controlKeterangan.textContent = "Giliran Anda";

        // Kembalikan control button seperti semula
        this.controlButton.style.display = null;
      }
    }, 1000); // 1000 = 1 detik
  }

  tampilkanPemenang() {
    // Tampilkan kembali overlay
    const overlay = document.querySelector("#overlay");
    overlay.style.display = null;

    // Ubah text overlay
    const overlayTitle = document.querySelector("#overlay .title");
    if (this.giliran === "anda") {
      overlayTitle.textContent = "Selamat, anda menang!";
    } else if (this.giliran === "robot") {
      overlayTitle.textContent = "Yah, anda kalah :(";
    }

    const overlayButton = document.querySelector("#overlay button");
    overlayButton.textContent = "Main lagi";
  }
}

const overlayButton = document.querySelector("#overlay button");
const overlay = document.querySelector("#overlay");
overlayButton.addEventListener("click", () => {
  // Kita display none overlay
  overlay.style.display = "none";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  new Game();
});
