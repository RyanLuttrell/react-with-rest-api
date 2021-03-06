//Import all dependencies to insure the course route can operate properly
const express = require('express');
const db = require('../db');
const router = express.Router();
const {User} = db.models;
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const {check, validationResult} = require('express-validator');

// Async/await middleware
function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (err) {
        err = new Error();
        err.status = 500;
        err.message = `Looks like the user you requested doesn't exist`;
        next(err);
      }
    };
  }

  //Middleware to authenticate the user for the API
  const userAuthentication = async (req, res, next) => {
    let message = null;
    const credentials = auth(req);

    //Check to ensure that the user has input credentials
    if (credentials) {
      const user = await User.findOne({
        where: {
          emailAddress: credentials.name
        }
      })
      const password = user.password;

      //Check to ensure that the username entered by the user matches an email in the database
      if (user) {
        const authenticated = bcrypt
          .compareSync(credentials.pass, password)
        
        //Check to ensure that the password entered by the user matches the password in the database
        if (authenticated) {
          req.currentUser = user
        }  else {
          message = `Authentication failure for Username: ${credentials.name}`
        }
      } else {
        message = `User not found for Username: ${credentials.name}`
      }
    } else {
      message = 'Auth header not found';
    }

    if (message) {
      console.warn(message)

      res.status(401).json({message: 'Access Denied'})
    } else {
      next();
    }
  }


// GET /api/users 200 - Returns the currently authenticated user
router.get('/users',asyncHandler(userAuthentication), asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    id: user.id
  })
}));

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/users', [
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "first name"'),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "last name"'),
  check('emailAddress')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "email"')
    .isEmail()
    .withMessage('Please provide a valid email address for "email"'),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "password"'),
], asyncHandler (async(req, res) => {
  // Good request, hash password
  try{
    // Validation Errors prior to storing new User data   
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    } 
    await User.create({
      firstName: req.body.firstName, 
      lastName: req.body.lastName, 
      emailAddress: req.body.emailAddress,
      password: await bcrypt.hash(req.body.password, 10)
      });
  } catch (error){
    // Unique Email Requirement
    if (error.errors[0].type === 'unique violation'){
      return res.status(400).json({message: 'Email in use.'})
    }   
  } 
  res.status(201).location('/').end();
}));



  // } else {
  //   res.status(400).json({errors: errorMessages})
  // }

module.exports = router