const express = require('express');
const GroupMessage = require('../models/GroupMessage');
const PrivateMesasge = require('../models/PrivateMessage');

const router = express.Router()

module.exports = router;

const date = new Date();

router.get('/',
    async(res, req) => {
        console.log("Chat function")
    }
)


