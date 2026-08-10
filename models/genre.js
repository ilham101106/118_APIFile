module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define("Genre", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_genre: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('nama');
      },
      set(val) {
        this.setDataValue('nama', val);
      }
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "genre",
    timestamps: true
  });

  return Genre;
};
