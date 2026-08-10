module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define("Komik", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sinopsis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deskripsi: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('sinopsis');
      },
      set(val) {
        this.setDataValue('sinopsis', val);
      }
    },
    pengarang: {
      type: DataTypes.STRING,
      allowNull: true
    },
    penerbit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tahun_terbit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "genre",
        key: "id"
      }
    },
    penulis_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "penulis",
        key: "id"
      }
    }
  }, {
    tableName: "komik",
    timestamps: true
  });

  return Komik;
};
