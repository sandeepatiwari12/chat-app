const router = require("express").Router();
const uuid = require("uuid");
global.users = [];
// api/user/signup
router.route("/signup").post((req, res) => {
  let userObj = {
    id: uuid.v4(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  if (global.users && global.users.length > 0) {
    global.users.forEach(user => {
      if (user.email == req.body.email) {
        res.json({
          status: "error",
          message: "The Email ID Already Exist"
        });
      } else {
        global.users.push(userObj);
      }
    });
  } else {
    global.users.push(userObj);
  }
  console.log("while creating new user", global.users);
  res.status(200).json({
    status: "ok",
    message: "User Added Succesfully"
  });
});

// api/user/login
router.route("/login").post((req, res) => {
  console.log("the requested body for login", req.body);
  if (global.users && global.users.length > 0) {
    let loginObj = {
      email: req.body.email,
      password: req.body.password
    };

    let temp;
    global.users.some(user => {
      if (user.email == loginObj.email) {
        if (user.password == loginObj.password) {
            temp = {
            status: "ok",
            message: "You have logged in succesfully...",
            data: user
          };
          return true;
        } else {
            temp = {
            status: "error",
            message: "You have entered wrong password"
          };
          return true;
        }
      }
    });
    res.json(temp);
  } else {
    res.json({
      status: "error",
      message: "You have entered wrong Credentials"
    });
  }
});



// api/user/update
router.route("/update/:id").post((req, res) => { 
  console.log('requested username to update', req.body)
  let updateObj = {
    id: req.body.id,
    email: req.body.email,
    oldusername: req.body.username,
    username: req.body.newUserName,
    password: req.body.password,
    room: req.body.room
  };
let outputObj;
  global.users.forEach((element, index) => {
    if(element.id === req.params.id) {
      global.users[index] = updateObj;
      outputObj = {
        status: 'ok',
        message: 'The user name has been updated succesfully',
        data: global.users[index]
      }
    }
});
res.json(outputObj)
});


module.exports = router;
