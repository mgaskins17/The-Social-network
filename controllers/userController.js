const User = require("../models/User");


module.exports = {

// GET all users
getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err))
},

// GET a single user by it's _id and populated thought and friend data
getSingleUser(req, res) {
    User.findOne( { _id: req.params.userId })
    .then((User) => res.json(User))
    .catch((err) => res.status(500).json(err))
},

// POST a new user
postNewUser(req, res) {
    User.create(req.body)
    .then((userData) => res.json(userData))
    .catch((err) => res.status(500).json(err))
},


// PUT to update a user by it's _id
updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true},
    )
    .then((userData) => res.json(userData))
    .catch((err) => res.status(500).json(err))
},

// DELETE to remove a user by it's _id
deleteUser(req, res) {
    User.findOneAndRemove(
        { _id: req.params.userId }
    )
    .then((userData) => res.json(userData))
    .catch((err) => res.status(500).json(err))
}










}