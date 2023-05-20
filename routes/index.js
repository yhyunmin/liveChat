const express = require('express');
const CINDEX= require('../controller/Cindex.js');
const CROOM = require('../controller/Croom.js');
const router = express.Router();

console.log("CINDEX >>>>>>>>>>>>>>>>>>>>>>", CINDEX);
console.log("CROOM >>>>>>>>>>>>>>>>>>>>>>", CROOM);


router.get('/',CINDEX.getIndex);
router.get('/chat',CROOM.getRoom);

module.exports = router;
