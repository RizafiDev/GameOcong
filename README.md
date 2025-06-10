# GameOcong 🎯🔫

Game shooter seru dengan aksi tembak-menembak yang menegangkan dan gameplay yang adiktif!

## 🎮 Tentang Game

GameOcong adalah game shooter yang menantang dimana pemain harus bertahan hidup melawan gelombang musuh yang terus berdatangan. Dengan nama yang unik dan gameplay yang seru, game ini menawarkan pengalaman bermain yang tak terlupakan dengan berbagai senjata, power-up, dan level yang menantang.

## ✨ Fitur Utama

- **Aksi Shooter Intens**: Gameplay tembak-menembak yang cepat dan menegangkan
- **Berbagai Jenis Senjata**: Pistol, shotgun, rifle, dan senjata khusus lainnya
- **Sistem Musuh Beragam**: Musuh dengan AI dan pola serangan yang berbeda
- **Power-Up System**: Boost ammo, health, damage, dan kemampuan khusus
- **Multiple Levels**: Level yang semakin sulit dengan design yang unik
- **Sistem Skor**: Leaderboard dan tracking performa pemain
- **Efek Visual Keren**: Muzzle flash, blood effects, dan particle systems
- **Sound Design**: Efek suara senjata dan ambient yang realistis

## 🚀 Instalasi & Setup

### Prasyarat

Pastikan sistem Anda memiliki:

- Node.js (versi 16 atau lebih baru)
- npm atau yarn package manager
- Browser modern dengan dukungan WebGL
- Mouse dan keyboard untuk kontrol optimal

### Langkah Instalasi

1. Clone repository:
```bash
git clone https://github.com/RizafiDev/GameOcong.git
```

2. Masuk ke direktori proyek:
```bash
cd GameOcong
```

3. Install dependencies:
```bash
npm install
# atau
yarn install
```

4. Jalankan development server:
```bash
npm start
# atau
yarn start
```

5. Buka browser dan akses `http://localhost:3000`

## 🎯 Cara Bermain

### Kontrol Game

| Input | Aksi |
|-------|------|
| **W, A, S, D** | Bergerak (atas, kiri, bawah, kanan) |
| **Mouse** | Aiming/mengarahkan bidikan |
| **Left Click** | Menembak |
| **Right Click** | Aim down sights (jika tersedia) |
| **R** | Reload senjata |
| **E** | Interaksi/ambil item |
| **Q** | Ganti senjata |
| **Spacebar** | Dodge/roll (jika tersedia) |
| **Esc** | Pause menu |

### Tujuan Permainan

1. **Bertahan Hidup**: Hadapi gelombang musuh yang terus berdatangan
2. **Eliminasi Target**: Hancurkan semua musuh di setiap wave
3. **Kumpulkan Power-Up**: Ambil ammo, health pack, dan upgrade senjata
4. **Skor Tinggi**: Dapatkan poin sebanyak mungkin untuk masuk leaderboard
5. **Progress Level**: Selesaikan semua level dan hadapi boss fights

### Sistem Penilaian

- **Headshot**: 50 poin + bonus akurasi
- **Body Shot**: 25 poin
- **Elimination Bonus**: 10 poin per musuh
- **Survival Time**: 1 poin per detik
- **Combo Kill**: Bonus multiplier untuk kill beruntun
- **Perfect Wave**: Bonus besar jika menyelesaikan wave tanpa terkena damage

## 🛠️ Teknologi

- **JavaScript ES6+**: Game logic dan mechanics
- **HTML5 Canvas/WebGL**: Rendering grafis
- **Web Audio API**: Sistem audio dan sound effects
- **CSS3**: UI styling dan animations
- **Local Storage**: Save data dan high scores

## 📁 Struktur Proyek

```
GameOcong/
├── src/
│   ├── js/
│   │   ├── game.js          # Main game engine
│   │   ├── player.js        # Player character
│   │   ├── enemies/         # Enemy types dan AI
│   │   ├── weapons/         # Weapon system
│   │   ├── powerups.js      # Power-up mechanics
│   │   ├── physics.js       # Collision dan physics
│   │   ├── audio.js         # Sound management
│   │   └── ui.js            # User interface
│   ├── css/
│   │   ├── main.css         # Main styles
│   │   └── animations.css   # CSS animations
│   ├── assets/
│   │   ├── sprites/         # Character dan object sprites
│   │   ├── audio/           # Sound effects dan music
│   │   ├── maps/            # Level designs
│   │   └── ui/              # UI elements
│   └── index.html           # Entry point
├── dist/                    # Production build
├── tests/                   # Unit tests
└── package.json             # Dependencies
```

## 🎨 Game Mechanics

### Sistem Senjata
- **Pistol**: Akurat, damage sedang, ammo terbatas
- **Shotgun**: Damage tinggi jarak dekat, spread luas
- **Assault Rifle**: Rate of fire tinggi, recoil sedang
- **Sniper Rifle**: Damage sangat tinggi, slow rate of fire
- **SMG**: Rate of fire sangat tinggi, damage rendah

### Jenis Musuh
- **Grunt**: Musuh dasar dengan pergerakan sederhana
- **Soldier**: Musuh dengan senjata yang lebih baik
- **Heavy**: Musuh tanky dengan armor tebal
- **Sniper**: Musuh jarak jauh dengan akurasi tinggi
- **Boss**: Musuh akhir dengan HP dan kemampuan khusus

### Power-Up System
- **Health Pack**: Restore HP pemain
- **Ammo Box**: Isi ulang ammunition
- **Damage Boost**: Meningkatkan damage sementara
- **Speed Boost**: Meningkatkan movement speed
- **Invincibility**: Kebal damage untuk waktu tertentu
- **Double Points**: Menggandakan poin yang didapat

## 🔧 Development

### Development Mode
```bash
npm run dev
# atau
yarn dev
```

### Build Production
```bash
npm run build
# atau
yarn build
```

### Run Tests
```bash
npm test
# atau
yarn test
```

### Linting
```bash
npm run lint
# atau
yarn lint
```

## 🌟 Screenshots
![Screenshot Capture - 2025-06-10 - 19-45-32](https://github.com/user-attachments/assets/24d5f653-d16e-4e89-a93d-f76a6eb90f22)
![image](https://github.com/user-attachments/assets/3cf3a89e-de32-4389-9454-6628436d2f3f)


## 🎯 Roadmap

### Version 1.1
- [ ] Mode multiplayer online
- [ ] Lebih banyak jenis senjata
- [ ] Customization karakter
- [ ] Achievement system

### Version 1.2
- [ ] Campaign mode dengan story
- [ ] Co-op mode untuk 2-4 pemain
- [ ] Mobile version dengan touch controls
- [ ] Weapon crafting system

### Version 2.0
- [ ] 3D graphics upgrade
- [ ] VR support
- [ ] Tournament mode
- [ ] Map editor

## 🤝 Kontribusi

Ingin berkontribusi? Ikuti langkah berikut:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/fitur-keren`)
3. Commit perubahan (`git commit -m 'Tambah fitur keren'`)
4. Push ke branch (`git push origin feature/fitur-keren`)
5. Buat Pull Request

### Guidelines Kontribusi
- Gunakan conventional commits
- Tambahkan tests untuk fitur baru
- Update dokumentasi jika diperlukan
- Ikuti coding standards yang ada
- Test game secara menyeluruh

## 🎮 Tips & Trik

### Untuk Pemula
- **Gunakan Cover**: Manfaatkan obstacles untuk berteduh
- **Kelola Ammo**: Jangan boros peluru, reload di waktu yang aman
- **Prioritas Target**: Eliminasi musuh berbahaya terlebih dahulu
- **Kumpulkan Power-Up**: Jangan lewatkan health pack dan ammo

### Untuk Pro Player
- **Master Headshots**: Latih akurasi untuk damage maksimal
- **Movement Techniques**: Gunakan strafe dan dodge dengan efektif
- **Weapon Switching**: Ganti senjata sesuai situasi
- **Combo System**: Manfaatkan kill streak untuk bonus poin

## 🐛 Bug Report

Menemukan bug? Buat issue dengan informasi:
- Deskripsi bug yang detail
- Langkah untuk reproduce
- Expected vs actual behavior
- Screenshot/video jika memungkinkan
- Spesifikasi sistem (OS, browser, dll)

## 📝 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE).

## 🏆 Credits

- **Game Developer**: [RizafiDev](https://github.com/RizafiDev)
- **Game Design**: Inspired by classic top-down shooters
- **Sound Effects**: [Sumber audio]
- **Graphics**: [Sumber assets]
- **Testing**: Community contributors

## 📞 Kontak & Dukungan

- **GitHub Issues**: [Repository Issues](https://github.com/RizafiDev/GameOcong/issues)
- **Email Developer**: [email]
- **Discord Community**: [invite link]
- **Social Media**: [links]

## 🌐 Links

- **Play Online**: [Game URL jika di-deploy]
- **Video Gameplay**: [YouTube link]
- **Development Blog**: [Blog posts tentang development]

---

**🎮 Selamat Bermain dan Semoga Berhasil Menjadi Shooter Terbaik! 🎯**

**Dibuat dengan 💥 dan ☕ oleh [RizafiDev](https://github.com/RizafiDev)**

⭐ **Star repository ini jika GameOcong menghibur Anda!**
