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
      return;
    }

    this.posisiSaatIni = posisiBaru;
    this.gambar.style.top = `${this.posisiSaatIni * 100}px`;
  }
}

class Game {
  constructor() {
    this.mobilAnda = new Mobil(".mobil-anda-section .gambar-mobil");
    this.mobilRobot = new Mobil(".mobil-robot-section .gambar-mobil");
    this.giliran = "anda"; // Nilai hanya boleh "anda" atau "robot"

    this.controlAngka = document.querySelector("#game-control .angka");
    this.controlAngka.textContent = 0;

    this.controlKeterangan = document.querySelector(
      "#game-control .keterangan"
    );
    this.controlKeterangan.textContent = "Giliran Anda";

    this.controlButton = document.querySelector("#game-control button");
    this.controlButton.style.visibility = "visible";
    this.controlButton.addEventListener("click", () => {
      // Sembunyikan tombol agar tidak ter-click lagi sampai ditampilkan kembali saat "Giliran Anda"
      this.controlButton.style.visibility = "hidden";

      this.#acakAngka();
    });
  }

  #acakAngka() {
    // Ubah element angka menjadi warna putih saat diacak
    this.controlAngka.style.color = "#fff";

    // Acak angka
    let angka = 0;
    const interval = setInterval(() => {
      angka = Math.ceil(Math.random() * 5); // Acak dari 1 sampai 5
      this.controlAngka.textContent = angka;
    }, 50); // 50 = 0.05 detik

    // Hentikan acak angka setelah 2 detik
    setTimeout(() => {
      clearInterval(interval);

      // Kembalikan warna setelah selesai acak
      this.controlAngka.style.color = "#f89c1b";

      this.#tampilkanHasil(angka);
    }, 2000); // 2000 = 2 detik
  }

  #tampilkanHasil(angka) {
    if (this.giliran === "anda") {
      this.mobilAnda.pindahPosisi(angka);

      if (this.mobilAnda.posisiSaatIni === 20) {
        this.#tampilkanPemenang();
        return; // Tampilkan anda sebagai pemenang dan tidak lanjut ganti giliran
      }
    } else if (this.giliran === "robot") {
      this.mobilRobot.pindahPosisi(angka);

      if (this.mobilRobot.posisiSaatIni === 20) {
        this.#tampilkanPemenang();
        return; // Tampilkan robot sebagai pemenang dan tidak lanjut ganti giliran
      }
    }

    this.#gantiGiliran();
  }

  #gantiGiliran() {
    // Ganti giliran setelah 1 detik agar animasi mobil berpindah dapat terlihat
    setTimeout(() => {
      if (this.giliran === "anda") {
        this.giliran = "robot";

        this.controlKeterangan.textContent = "Giliran Robot";

        // Robot langsung mengacak angka
        this.#acakAngka();
      } else if (this.giliran === "robot") {
        this.giliran = "anda";

        this.controlKeterangan.textContent = "Giliran Anda";

        // Tampilkan kembali tombol untuk mengacak angka
        this.controlButton.style.visibility = "visible";
      }
    }, 1000); // 1000 = 1 detik
  }

  #tampilkanPemenang() {
    // Tampilkan pemenang setelah 1 detik agar animasi mobil berpindah dapat terlihat
    setTimeout(() => {
      const overlay = document.querySelector("#overlay");
      const overlayButton = document.querySelector("#overlay button");
      const overlayTitle = document.querySelector("#overlay .title");

      overlay.style.display = "flex";
      overlayButton.textContent = "Main lagi";

      if (this.giliran === "anda") {
        overlayTitle.textContent = "Selamat, anda menang!";
      } else if (this.giliran === "robot") {
        overlayTitle.textContent = "Yah, anda kalah :(";
      }
    }, 1000); // 1000 = 1 detik
  }
}

const overlay = document.querySelector("#overlay");
const overlayButton = document.querySelector("#overlay button");
overlayButton.addEventListener("click", () => {
  overlay.style.display = "none";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  new Game();
});
