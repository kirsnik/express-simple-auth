const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models');

router.post('/login', (req, res, next) => {
  console.log(req.body)
  // Find a user in the database with a matching username
  db.User.findOne({ username: req.body.username }, (err, result) => {
    if (err) {
      return res.json({ error: err.message });
    }

    // Compare the password withthe encrypted password in the database
    if (bcrypt.compareSync(req.body.password, result.password)) {
      const token = jwt.sign({
        userId: result._id,
        username: result.username,
        fullName: `${result.firstName} ${result.lastName}`,
      }, process.env.JWT_SECRET);

      // return json with user information and jwt token
      return res.json({
        userId: result._id,
        username: result.username,
        fullName: `${result.firstName} ${result.lastName}`,
        token: token,
      });
    } else { // if the passwords dont match then the user if denied from logging in
      console.log('not authenticated')
      return res.json({
        error: 'Invalid username/password'
      });
    }
  });
});

router.post('/signup', (req, res, next) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  // Create the user in mongodb
  db.User.create(newUser, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ error: err.message });
    }

    const token = jwt.sign({
      userId: data._id,
      username: data.username,
      fullName: `${data.firstName} ${data.lastName}`,
    }, process.env.JWT_SECRET);

    const result = {
      ...data,
      token
    };

    // return the newly created user
    return res.json(result);
  });
});

module.exports = router;
