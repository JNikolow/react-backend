var express = require('express');
var Validator = require('validator');
var bcrypt = require('bcrypt');
var isEmpty = require('lodash/isEmpty');


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.username)) {
      errors.username = 'This field is required';
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = 'This field is required';
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = 'This field is required';
    }
    if (Validator.isEmpty(data.passwordConfirmation)) {
      errors.passwordConfirmation = 'This field is required';
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
      errors.passwordConfirmation = 'Passwords must match';
    }
    if (Validator.isEmpty(data.timezone)) {
      errors.timezone = 'This field is required';
    }
      
    console.log('isValid : ', isEmpty(errors));
    console.log(errors);

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

router.post('/', (req, res) => {
  setTimeout(() => {
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }
  }, 5000);
});

module.exports = router;