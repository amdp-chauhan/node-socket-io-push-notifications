const _ = require('lodash');
const express = require('express');
const common = require('../services/common');

const router = new express.Router();

router.get('/one', async (req, res, next) => {
    res.render('client1', {})
})

router.get('/two', async (req, res, next) => {
    res.render('client2', {})
})
module.exports = router;