
const router = require('express').Router();
const uuid = require('uuid');

global.chatList = [];

// api/chat/chats
router.route('/chats').get((req, res) => {
    res.json({
        status: 'ok',
        message: 'chat message fetched succesfully...',
        data: global.chatList
    })
});

// api/chat/store
router.route('/store').post((req, res) => {
    let chat = req.body;
    console.log('request body to store chat', chat)
    global.chatList.push(chat);
    res.json({
        status: 'ok',
        message: 'chat message stored succesfully...'
    })
});



module.exports = router;
