// Developing each of the user routes stated in the ReadMe
const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    postNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');


// /api/users/
router.route('/').get(getUsers).post(postNewUser)

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;

