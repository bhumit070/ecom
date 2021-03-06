const { check, validationResult } = require('express-validator');
const { unProcessableEntity } = require('./messages');

const checkValidInput = (inputType) => {
  switch (inputType) {
    case 'email':
      return check('email', 'Please Enter Valid Email').isEmail();

    case 'name':
      return check(
        'name',
        'Please Enter Name with greater then 2 characters',
      ).isLength({ min: 3 });
    case 'gender':
      return check('gender', 'Please enter valid gender').equals(
        'male' || 'female',
      );

    case 'password':
      return check(
        'password',
        'Please Enter Alphanumeric Password With Greater then 5 characters',
      ).isLength({ min: 5 });
    case 'category':
      return check('category', 'Please enter category name').notEmpty();
  }
};

const isErrorInput = (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return unProcessableEntity(res, errors[0].msg);
  }
  next();
};

module.exports = {
  checkValidInput,
  isErrorInput,
};
