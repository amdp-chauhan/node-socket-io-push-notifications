const _ = require('lodash');
const express = require('express');
const common = require('../services/common');
const PushNotification = require('../services/push-notification');
const router = new express.Router();

/**
 * Add subscriber for push notification
 */
router.post('/add-subscriber', async (req, res, next) => {
  if (!req.body) {
    return res.status(500).send({
      error: 'Empty request'
    });
  }
  
  try {
    const { subscriberId } = req.body;
    const result = await PushNotification.addSubscriber(subscriberId);

    res.status(_.get(result, 'status', 200)).send(_.get(result, 'data'));
  } catch (error) {
    const parsed = common.parseError(error);
    return res.status(parsed.status).send(parsed.data);
  }
});

/**
 * send a message to notification subscriber
 */
router.post('/send', async (req, res, next) => {
  if (!req.body) {
    return res.status(500).send({
      error: 'Empty request'
    });
  }

  try {
    const result = await PushNotification.sendMessage(req.body);    

    res.status(_.get(result, 'status', 200)).send(_.get(result, 'data'));
  } catch (error) {
    const parsed = common.parseError(error);
    return res.status(parsed.status).send(parsed.data);
  }
});

module.exports = router;