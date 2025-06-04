const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PostPhoto = sequelize.define('PostPhoto', {
    photo_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'post_photos',
    timestamps: false
  });

  return PostPhoto;
};
