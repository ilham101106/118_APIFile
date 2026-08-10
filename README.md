# 118_APIFile - RESTful Web Service API Komik dengan Upload File Gambar

API RESTful untuk pengelolaan **Penulis**, **Genre**, dan **Komik** dengan **Autentikasi JWT (JSON Web Token)**, **Upload File Gambar (Multer)**, serta mendukung **Konversi Data, Encoding, dan Deserialisasi Multi-Format (JSON, XML, YAML)** menggunakan Node.js, Express framework, Sequelize ORM, dan PostgreSQL.

---
---

## 📸 Dokumentasi Screenshot Pengujian Endpoint (POSTMAN)

Berikut adalah dokumentasi hasil pengujian response API untuk seluruh endpoint wajib menggunakan tampilan Postman UI:

### 1. POST Register Penulis
<img width="1536" height="908" alt="image" src="https://github.com/user-attachments/assets/f34f8b65-ea76-4229-93a2-23aa01e583e2" />



### 2. POST Login Penulis
<img width="1536" height="911" alt="image" src="https://github.com/user-attachments/assets/31116232-fbf1-44e8-9c2b-7929c242722e" />



### 3. POST Tambah Genre
<img width="1536" height="910" alt="image" src="https://github.com/user-attachments/assets/8d912086-6773-48c0-b29c-abd388b0889e" />



### 4. POST Komik (Tambah Komik)
<img width="1536" height="918" alt="image" src="https://github.com/user-attachments/assets/057c7a54-d96f-4295-b0d2-ad0c4a24eaff" />


### 5. POST Tambah Komik (Upload File Gambar - Sesuai Foto Contoh)
<img width="1536" height="906" alt="image" src="https://github.com/user-attachments/assets/060b7191-7560-4666-bda8-47eab47bdfe6" />



### 6. GET Akses/Lihat File Gambar Terupload (Routing Statis)
<img width="1536" height="911" alt="image" src="https://github.com/user-attachments/assets/bac07ea3-25bf-4f72-9393-2872991b504d" />





### 7. Update Komik (Ganti Gambar)
<img width="1536" height="909" alt="image" src="https://github.com/user-attachments/assets/0b9b5714-2424-492d-bd56-ba3e1bec6979" />



### 8. DELETE Hapus Komik

<img width="1536" height="903" alt="image" src="https://github.com/user-attachments/assets/b8ceb59b-dd3d-46c7-b9b8-3081f01db7da" />




## 📌 Ketentuan Tugas (Pertemuan 8)
- **Nama Repository**: `118_APIRelation`
- **Link Repo Tugas**: `https://github.com/ilham101106/118_APIRelation.git`
- **Minimal Commit**: ≥ 20 Commits
- **Materi Utama**: *JSON, XML, YAML; konversi data, encoding, dan deserialisasi antar platform.*
- **Dokumentasi Screenshot**: Screenshot pengujian endpoint menggunakan tampilan Postman UI pada `README.md`.

---

## 🛠️ Teknologi & Library
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize ORM
- **Database**: PostgreSQL (Support auto-create DB)
- **Autentikasi & Keamanan**: `jsonwebtoken` (JWT), `bcrypt`
- **Konversi Data & Deserialisasi**: `xml2js`, `jstoxml`, `js-yaml`
- **Variabel Lingkungan**: `dotenv`

---

## 🗄️ Skema Database & Relasi Model

Project ini terdiri dari 3 entitas utama yang saling berhubungan:

1. **Penulis (`penulis`)**: `id`, `nama`, `email`, `password`, `createdAt`, `updatedAt`
2. **Genre (`genre`)**: `id`, `nama_genre`, `deskripsi`, `createdAt`, `updatedAt`
3. **Komik (`komik`)**: `id`, `judul`, `pengarang`, `penerbit`, `tahun_terbit`, `genre_id` (FK -> `genre.id`), `penulis_id` (FK -> `penulis.id`), `createdAt`, `updatedAt`

> **Relasi Table**:
> - `Genre` `hasMany` `Komik` (`genre_id`), `Komik` `belongsTo` `Genre`
> - `Penulis` `hasMany` `Komik` (`penulis_id`), `Komik` `belongsTo` `Penulis`

---

## 🔄 Fitur Konversi Data, Encoding & Deserialisasi (JSON, XML, YAML)

Sesuai materi **Pertemuan 8**, API ini mendukung deserialisasi data input dan serialisasi response dalam 3 format utama:

1. **JSON (`application/json`)**: Format standar REST API.
2. **XML (`application/xml`)**: Serialisasi otomatis jika header `Accept: application/xml` atau parameter query `?format=xml`.
3. **YAML (`application/x-yaml`)**: Serialisasi otomatis jika header `Accept: application/x-yaml` atau parameter query `?format=yaml`.

---

## 🚀 Panduan Jalankan Project

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/ilham101106/118_APIRelation.git
cd 118_APIRelation
npm install
```

### 2. Konfigurasi File Environment (`.env`)
Buat file `.env` berdasarkan `.env.example`:
```env
PORT=3000
DB_NAME=api_relasi_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
JWT_SECRET=supersecretkey_118_apirelasi
```

### 3. Jalankan Aplikasi
- Mode Development:
  ```bash
  npm run dev
  ```
- Mode Production / Start:
  ```bash
  npm start
  ```

---

## 📡 Daftar Endpoint API

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/register` | Registrasi akun Penulis/User baru | ❌ No |
| `POST` | `/api/login` | Login Penulis & dapatkan JWT Token | ❌ No |
| `POST` | `/api/genre` | Menambah data Genre baru | 🔒 Yes (JWT) |
| `GET` | `/api/genre` | Mengambil seluruh data Genre | ❌ No |
| `GET` | `/api/genre/:id` | Mengambil detail Genre berdasarkan ID | ❌ No |
| `PUT` | `/api/genre/:id` | Mengubah data Genre berdasarkan ID | 🔒 Yes (JWT) |
| `DELETE` | `/api/genre/:id` | Menghapus Genre berdasarkan ID | 🔒 Yes (JWT) |
| `POST` | `/api/komik` | Menambah data Komik baru (dengan relasi) | 🔒 Yes (JWT) |
| `GET` | `/api/komik` | Mengambil seluruh data Komik (dengan relasi Genre) | ❌ No |
| `GET` | `/api/komik/:id` | Mengambil detail Komik berdasarkan ID | ❌ No |
| `PUT` | `/api/komik/:id` | Mengubah data Komik berdasarkan ID | 🔒 Yes (JWT) |
| `DELETE` | `/api/komik/:id` | Menghapus Komik berdasarkan ID | 🔒 Yes (JWT) |

---



## 📝 Pengujian API Otomatis
Untuk melakukan pengujian endpoint dan fitur konversi data secara otomatis:
```bash
node test_api.js
```
