var express = require('express');
const {createUser, getUsers, signinUser} = require('../controllers/user');
const { createValidator } = require('express-joi-validation');
const {createUserValidation, signinUserValidation} = require('../validation');

var router = express.Router();
const validator = createValidator();

router.get('/getUsers', getUsers)
router.post('/createUser', validator.body(createUserValidation), createUser)
router.post('/signinUser', validator.body(signinUserValidation), signinUser)

module.exports = router;
