const express = require('express');
const router = express.Router();
const path = require('path'); 

const rootDir = require('../helper/path');

const contacts = require('../controller/contacts');

router.get('/contactus', contacts.getContactUsfun);

router.post('/success', contacts.successfun);

module.exports = router;