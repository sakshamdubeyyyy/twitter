const { Notification } = require('../models');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 1. Update notification to seen = true
exports.markAsSeen = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Notification.update(
      { seen: true },
      { where: { notification_id: id, disabled: false } }
    );

    if (updated[0] === 0) return res.status(404).json({ message: 'Notification not found or already disabled' });

    res.status(200).json({ message: 'Notification marked as seen' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get all unseen notifications by user ID
exports.getUnseenNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.findAll({
      where: {
        receiver_id: userId,
        seen: false,
        disabled: false,
      },
      order: [['created_at', 'DESC']],
    });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Soft delete a notification
exports.softDeleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Notification.update(
      { disabled: true },
      { where: { notification_id: id } }
    );

    if (updated[0] === 0) return res.status(404).json({ message: 'Notification not found' });

    res.status(200).json({ message: 'Notification deleted (soft)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Get seen notifications by user ID
exports.getSeenNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.findAll({
      where: {
        receiver_id: userId,
        seen: true,
        disabled: false,
      },
      order: [['created_at', 'DESC']],
    });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Get deleted (disabled) notifications
exports.getDeletedNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.findAll({
      where: {
        receiver_id: userId,
        disabled: true,
      },
      order: [['created_at', 'DESC']],
    });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 6. Get all notifications (seen/unseen) for a user that are not disabled
exports.getAllActiveNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.findAll({
      where: {
        receiver_id: userId,
        disabled: false,
      },
      order: [['created_at', 'DESC']],
    });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
