var express = require("express");
const cors = require('cors');
var app = express();

var http = require("http");
var server = http.createServer(app);


var PORT = process.env.PORT || 3000;

var io = require("socket.io").listen(server);
io.on("connection", socket => {
  console.log("socket opened");

  socket.on("new_user_joined", data => {
    console.log("the joinee details", data);

    // to inform all the users
    socket.join(data.room);
    socket.in(data.room).broadcast.emit("server_new_user_joined", {
      message: data.username + " succesfully joined room ",
      username: data.username,
      room: data.room,
      date: new Date()
    });
  });

  // send and broadcast the message
  socket.on("new_message", data => {
    console.log('the user has sent', data)
    socket.in(data.room).broadcast.emit("server_new_message", {
      message: data.message,
      username: data.username,
      date: new Date()
    });
  });
});


app.use(cors());
app.use(express.json());
const usersRouter = require('./routes/user/user.route');
app.use('/api/user', usersRouter);


server.listen(PORT, () => {
  console.log("server starts");
});

