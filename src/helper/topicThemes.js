export const BLOG_THEMES = [
  "Digitalisasi Bisnis Proses untuk Efisiensi Operasional",
  "Pemanfaatan Cloud Computing bagi UMKM dan Perusahaan Menengah",
  "Transformasi Digital di Sektor Publik: Implementasi SPBE",
  "Keamanan Data dan Privasi di Era Digitalisasi",
  "Meningkatkan Kualitas Pendidikan dengan Sistem Informasi Akademik (SIAKAD)",
  "Otomasi Alur Kerja (Workflow Automation) dengan Teknologi Modern",
  "Pentingnya Integrasi Sistem untuk Pengambilan Keputusan Berbasis Data",
  "E-Government: Menuju Pelayanan Publik yang Transparan dan Cepat",
  "Peran Learning Management System (LMS) dalam Pelatihan Karyawan",
  "Membangun Fondasi Digital untuk Bisnis Masa Depan",
  "Strategi Mengadopsi Teknologi Baru tanpa Mengganggu Operasional Bisnis",
  "Digitalisasi Perizinan Terpadu: Mempercepat Birokrasi dengan Sistem Otomasi",
  "Dashboard Monitoring & Command Center: Visualisasi Data untuk Pimpinan",
  "Manajemen Yayasan Pendidikan yang Terintegrasi (Keuangan, SDM, Aset)",
  "Agile Development: Cara Prambanan Digital Memberikan Solusi Cepat dan Berkualitas"
];

export const getRandomTheme = () => {
  return BLOG_THEMES[Math.floor(Math.random() * BLOG_THEMES.length)];
};
