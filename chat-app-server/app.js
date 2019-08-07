var express = require("express");
const cors = require('cors');
var app = express();

var http = require("http");
var server = http.createServer(app);

// 
app.use(cors());
app.use(express.json());

var PORT = process.env.PORT || 3000;

var io = require("socket.io").listen(server);
io.on("connection", socket => {
  console.log("socket opened");

  socket.on("new_user_joined", data => {
    // console.log("the joinee details", data);

    // to inform all the users
    socket.join(data.room);
    socket.in(data.room).broadcast.emit("server_new_user_joined", {
      message: data.username + " succesfully joined room ",
      username: data.username,
      room: data.room,
      date: new Date(),
      type: 'new_joinee'
    });
  });

  // send and broadcast the message
  socket.on("new_message", data => {
    // console.log('the user has sent', data)
    socket.in(data.room).broadcast.emit("server_new_message", {
      message: data.message,
      username: data.username,
      email: data.email,
      date: new Date(),
      type: 'new_message'
    });
  });

   // When User has updated the use name
   socket.on("update_username", data => {
    console.log('the user has sent to inform all ======>', data)
    socket.in(data.room).broadcast.emit("get_user_update", {
      message: `${data.oldusername + ' has changed name to ' + data.username}`,
      type: 'user_update'
    });
  });
});


const usersRouter = require('./routes/user/user.route');
const chatRouter = require('./routes/chats/chats.route')
app.use('/api/user', usersRouter);
app.use('/api/chat', chatRouter)

server.listen(PORT, () => {
  console.log("server starts");
});

