const db = require('../config/db');
const User = require('./User')(db);
const Post = require('./Post')(db);
const Comment = require('./Comment')(db);

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  db,
  User,
  Post,
  Comment
};
