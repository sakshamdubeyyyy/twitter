const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get("/", notificationController.getAllNotifications);

// Mark notification as seen
router.patch('/:id/seen', notificationController.markAsSeen);

// Get unseen notifications for a user
router.get('/unseen/:userId', notificationController.getUnseenNotifications);

// Soft delete notification
router.delete('/:id', notificationController.softDeleteNotification);

// Get seen notifications for a user
router.get('/seen/:userId', notificationController.getSeenNotifications);

// Get deleted notifications for a user
router.get('/deleted/:userId', notificationController.getDeletedNotifications);

router.get("/:userId/active", notificationController.getAllActiveNotifications);

module.exports = router;
