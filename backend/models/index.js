const db = require('../config/db');
const User = require('./User')(db);
const Post = require('./Post')(db);
const Comment = require('./Comment')(db);
const PostLike = require('./PostLike')(db); 
const PostPhoto = require('./PostPhoto')(db);
const Notification = require('./Notification')(db);

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(PostLike, { foreignKey: 'user_id', onDelete: 'CASCADE' });
PostLike.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(PostLike, { foreignKey: 'post_id', as: 'likes'});
PostLike.belongsTo(Post, { foreignKey: 'post_id' });

Post.hasMany(PostPhoto, { foreignKey: 'post_id', as: 'photos', onDelete: 'CASCADE' });
PostPhoto.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Notification, { foreignKey: 'sender_id', as: 'sentNotifications' });
User.hasMany(Notification, { foreignKey: 'receiver_id', as: 'receivedNotifications' });
Notification.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Notification.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

// Notification is linked to a post
Post.hasMany(Notification, { foreignKey: 'post_id' });
Notification.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = {
  db,
  User,
  Post,
  Comment,
  PostLike, 
  PostPhoto,
  Notification
};
