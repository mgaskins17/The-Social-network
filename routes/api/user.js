// Developing each of the user routes stated in the ReadMe
const router = require('express').Router();
const {
    getUsers,
} = require('../../controllers/userController');


// /api/users/
router.route('/').get(getUsers);


module.exports = router;

