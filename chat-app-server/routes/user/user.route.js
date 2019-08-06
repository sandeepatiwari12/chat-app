
const router = require('express').Router();
const uuid = require('uuid')

// api/user/signup
router.route('/signup').post((req, res) => {
    let userObj = {
        id: uuid.v4(),
        lastName: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    res.json ({
        status: 'ok',
        message: 'User Added Succesfully',
        data: userObj
    });
  });

// api/user/login
  router.route('/login').post((req, res) => {
      console.log('the requested body for login', req.body)
      if(req.body && req.body.allUsers) {
      let users = req.body.allUsers;
      console.log('allUsers', users)
      let loginObj = {
          email: req.body.email,
          password: req.body.password
      }
      if(users.email.includes(loginObj.email)) {
          if(users.password.includes(loginObj.password)) {
            res.json({
                status: 'ok',
                message: 'You have logged in succesfully...',
                data: users
            });
          } else {
              res.json({
                  status: 'error',
                  message: 'You have entered wrong password',
              });
          }
      } else {
        res.json({
            status: 'error',
            message: 'You have entered wrong email',
        });
      }
    } else {
        res.json({
            status: 'error',
            message: 'You have entered wrong Credentials',
        })
    }
  })

module.exports = router;
