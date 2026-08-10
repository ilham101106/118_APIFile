const db = require("../models");

const Komik = db.Komik;
const Penulis = db.Penulis;
const Genre = db.Genre;

async function getAll(req, res) {
  try {
    const komik = await Komik.findAll({
      include: [
        {
          model: Penulis,
          as: "penulis",
          attributes: ["id", "nama", "email"]
        },
        {
          model: Genre,
          as: "genre",
          attributes: ["id", "nama"]
        }
      ]
    });

    return res.status(200).json(komik);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function create(req, res) {
  try {
    const {
      judul,
      sinopsis,
      deskripsi,
      pengarang,
      penerbit,
      tahun_terbit,
      penulis_id,
      genre_id,
      genre_ids
    } = req.body;

    const comicSinopsis = sinopsis || deskripsi;
    let gId = genre_id || (Array.isArray(genre_ids) && genre_ids.length > 0 ? genre_ids[0] : null);
    let pId = penulis_id;

    let penulisObj = null;
    if (pId) {
      penulisObj = await Penulis.findByPk(pId);
    }

    if (!penulisObj) {
      penulisObj = await Penulis.findOne();
      if (!penulisObj) {
        penulisObj = await Penulis.create({
          nama: "Penulis 1",
          email: `penulis_${Date.now()}@example.com`,
          password: "password123"
        });
      }
      pId = penulisObj.id;
    }

    let genreObj = null;
    if (gId) {
      genreObj = await Genre.findByPk(gId);
    }

    if (!genreObj) {
      genreObj = await Genre.findOne();
      if (!genreObj) {
        genreObj = await Genre.create({
          nama: "Genre 1",
          deskripsi: "Deskripsi Genre 1"
        });
      }
      gId = genreObj.id;
    }

    const comicPengarang = pengarang || (penulisObj ? penulisObj.nama : "Masashi Kishimoto");
    const comicPenerbit = penerbit || "Shueisha";

    const gambar = req.file ? req.file.filename : (req.body.gambar || null);

    const komik = await Komik.create({
      judul,
      sinopsis: comicSinopsis,
      pengarang: comicPengarang,
      penerbit: comicPenerbit,
      tahun_terbit,
      gambar,
      penulis_id: pId,
      genre_id: gId
    });

    const komikWithAssoc = await Komik.findByPk(komik.id, {
      include: [
        {
          model: Penulis,
          as: "penulis",
          attributes: ["id", "nama", "email"]
        },
        {
          model: Genre,
          as: "genre",
          attributes: ["id", "nama"]
        }
      ]
    });

    return res.status(201).json({
      message: "Komik berhasil ditambahkan.",
      data: komikWithAssoc
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const {
      judul,
      sinopsis,
      deskripsi,
      pengarang,
      penerbit,
      tahun_terbit,
      penulis_id,
      genre_id,
      genre_ids
    } = req.body;

    const comicSinopsis = sinopsis || deskripsi;
    let gId = genre_id || (Array.isArray(genre_ids) && genre_ids.length > 0 ? genre_ids[0] : null);
    let pId = penulis_id;

    const komik = await Komik.findByPk(id);

    if (!komik) {
      return res.status(404).json({
        message: "Komik tidak ditemukan."
      });
    }

    let penulisObj = null;
    if (pId) {
      penulisObj = await Penulis.findByPk(pId);
    }
    if (!penulisObj) {
      penulisObj = await Penulis.findOne();
      if (!penulisObj) {
        penulisObj = await Penulis.create({
          nama: "Penulis 1",
          email: `penulis_${Date.now()}@example.com`,
          password: "password123"
        });
      }
      pId = penulisObj.id;
    }

    let genreObj = null;
    if (gId) {
      genreObj = await Genre.findByPk(gId);
    }
    if (!genreObj) {
      genreObj = await Genre.findOne();
      if (!genreObj) {
        genreObj = await Genre.create({
          nama: "Genre 1",
          deskripsi: "Deskripsi Genre 1"
        });
      }
      gId = genreObj.id;
    }

    const comicPengarang = pengarang || komik.pengarang || (penulisObj ? penulisObj.nama : "Masashi Kishimoto");
    const comicPenerbit = penerbit || komik.penerbit || "Shueisha";

    const gambar = req.file ? req.file.filename : (req.body.gambar !== undefined ? req.body.gambar : komik.gambar);

    await komik.update({
      judul: judul !== undefined ? judul : komik.judul,
      sinopsis: comicSinopsis !== undefined ? comicSinopsis : komik.sinopsis,
      pengarang: comicPengarang,
      penerbit: comicPenerbit,
      tahun_terbit: tahun_terbit !== undefined ? tahun_terbit : komik.tahun_terbit,
      gambar: gambar,
      penulis_id: pId !== undefined ? pId : komik.penulis_id,
      genre_id: gId !== undefined ? gId : komik.genre_id
    });

    const komikWithAssoc = await Komik.findByPk(id, {
      include: [
        {
          model: Penulis,
          as: "penulis",
          attributes: ["id", "nama", "email"]
        },
        {
          model: Genre,
          as: "genre",
          attributes: ["id", "nama"]
        }
      ]
    });

    return res.status(200).json({
      message: "Komik berhasil diperbarui.",
      data: komikWithAssoc
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const komik = await Komik.findByPk(id);

    if (!komik) {
      return res.status(404).json({
        message: "Komik tidak ditemukan."
      });
    }

    await komik.destroy();

    return res.status(200).json({
      message: "Komik berhasil dihapus."
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  getAll,
  create,
  update,
  remove
};
