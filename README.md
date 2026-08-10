# 118_APIFile - RESTful Web Service API Komik dengan Upload File Gambar

API RESTful untuk pengelolaan **Penulis**, **Genre**, dan **Komik** dengan **Autentikasi JWT (JSON Web Token)**, **Upload File Gambar (Multer)**, serta mendukung **Konversi Data, Encoding, dan Deserialisasi Multi-Format (JSON, XML, YAML)** menggunakan Node.js, Express framework, Sequelize ORM, dan PostgreSQL.

---
---

## 📸 Dokumentasi Screenshot Pengujian Endpoint (POSTMAN)

Berikut adalah dokumentasi hasil pengujian response API untuk seluruh endpoint wajib menggunakan tampilan Postman UI:

### 1. POST Register Penulis
![POST Register]
<img width="1531" height="909" alt="image" src="https://github.com/user-attachments/assets/9e3b03bb-cc4a-4f66-a69f-aa2fd5271459" />


### 2. POST Login Penulis
![POST Login]
<img width="1536" height="740" alt="image" src="https://github.com/user-attachments/assets/f28c80eb-efe6-4a91-8d93-a2514d2acd29" />


### 3. POST Genre (Tambah Genre)
![POST Genre]
<img width="1536" height="688" alt="image" src="https://github.com/user-attachments/assets/7e3d0a9f-9daf-4cb1-ac62-e0cb3e4eb075" />


### 4. POST Komik (Tambah Komik)
![POST Komik]
<img width="1536" height="892" alt="image" src="https://github.com/user-attachments/assets/acd81ff0-29f7-40ef-b73b-97c5f62b5623" />


### 5. GET Genre (Lihat Seluruh Genre)
![GET Genre].
<img width="1536" height="843" alt="image" src="https://github.com/user-attachments/assets/ed8b261a-9ffa-4d13-98e6-540e1548d7ee" />


### 6. PUT Genre (Update Genre)
![PUT Genre]
<img width="1532" height="679" alt="image" src="https://github.com/user-attachments/assets/06a62929-0e7a-461d-a288-4973aa6a8dfa" />

### 7. DELETE Genre (Hapus Genre)
![DELETE Genre]
<img width="1536" height="648" alt="image" src="https://github.com/user-attachments/assets/f1352f50-2daf-4746-8f81-4ea75e9225f6" />


### 8. GET Komik (Lihat Seluruh Komik)
![GET Komik]
<img width="1536" height="869" alt="image" src="https://github.com/user-attachments/assets/3a9d1c10-a0b6-46ee-932f-816a45b25d62" />


### 9. PUT Komik (Update Komik)
![PUT Komik]
<img width="1536" height="889" alt="image" src="https://github.com/user-attachments/assets/9d0ace56-e91b-46a0-8907-c3384dd7626d" />


### 10. DELETE Komik (Hapus Komik)
![DELETE Komik]
<img width="1536" height="508" alt="image" src="https://github.com/user-attachments/assets/9d3a03fe-104d-45ed-9195-140091919629" />




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

## 📸 Dokumentasi Screenshot Pengujian Endpoint (POSTMAN)

Berikut adalah dokumentasi hasil pengujian response API untuk seluruh endpoint wajib menggunakan tampilan Postman UI:



## 📝 Pengujian API Otomatis
Untuk melakukan pengujian endpoint dan fitur konversi data secara otomatis:
```bash
node test_api.js
```
