const express = require('express');
const SampleController = require('../controllers/sample.controller');

const sampleController = new SampleController();
const sampleRouter = express.Router();
sampleRouter.all('*', sampleController.sayHello);

module.exports = sampleRouter;
