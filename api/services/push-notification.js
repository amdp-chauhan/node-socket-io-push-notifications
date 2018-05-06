const _ = require('lodash');
const storage = require('node-persist');
const ioProm = require('express-socket.io');
const express = require('express');
const socketSubscribers = {};

/**
 * Creating Namespaces for all subscribers
 */
ioProm.then(function(io) {
  // In every 10 seconds we are checking for new subscribers and creating a namespace
  setInterval(async () => {
      const subscribers = await storage.getItem('SubscriberIds');
      
      if (subscribers && Array.isArray(subscribers) && subscribers.length) {
          subscribers.forEach(subscriber => socketSubscribers[subscriber] = io.of(subscriber));
      }
  }, 5000)
});

/**
 * @param {String} subscriberId
 * @return {Object}
 */
module.exports.addSubscriber = async (subscriberId) => {
  if (!subscriberId) {
    throw new Error('Invalid SubscriberId.');
  }

  const subscriberIds = await storage.getItem('SubscriberIds');

  if (Array.isArray(subscriberIds) && subscriberIds.includes(`/${subscriberId}`)) {
    throw new Error('Subscriber Id already exists.');
  }

  if (subscriberIds && Array.isArray(subscriberIds)) {
    subscriberIds.push(`/${subscriberId}`);
    await storage.setItem('SubscriberIds', subscriberIds);
  } else {
    await storage.setItem('SubscriberIds', [`/${subscriberId}`]);
  }

  return {
    data: {
      result: await storage.getItem('SubscriberIds')
    }
  }
};

/**
 * @param {Object} document
 * @return {Object}
 */

module.exports.sendMessage = async (document) => {

  try {
    const { toSubscriberId, event, data } = document;
    console.log(toSubscriberId);
    console.log(event);
    console.log(data);
    if (!toSubscriberId || !event || !data) throw new Error('Invalid Request Parameters.');

    // Getting Subscriber Namespace instance
    const socketNamespace = socketSubscribers[`/${toSubscriberId}`];
    
    if (!socketNamespace) {
      throw new Error('Subscriber Id does not exists. Please add first.');
    }

    const message = {
      id: Math.floor(100000 + Math.random() * 900000),
      data
    }

    // Creating namespace connection for Subscriber
    socketNamespace.on('connection', function(socket) {
      console.log(":: Connected - ",`/${toSubscriberId}`);
    });

    // emmiting event along with message
    socketNamespace.emit(event, message);
    
    return {
      data: {
        result: true
      }
    }

  } catch (error) {
    throw new Error(error);
  }
};
