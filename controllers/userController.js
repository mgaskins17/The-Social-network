const User = require("../models/User");


module.exports = {

// GET all users
getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err))
},

// GET a single user by it's _id and populated thought and friend data
getAUser(req, res) {
    User.findOne( { _id: req.params.id })
    .then((User) => res.json(User))
},



// POST a new user




// PUT to update a user by it's _id




// DELETE to remove a user by it's _id











}