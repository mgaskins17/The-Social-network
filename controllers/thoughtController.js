const { User, Thought } = require('../models');

module.exports = {
// GETs all thought
getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err))
},

// GET a single thought by it's _id
getSingleThought(req, res) {
    Thought.findOne(
        { _id: req.params.thoughtId }
    )
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err))
},

// POST a new thought: { "username": "mgaskins", "email": "mgaskins@mail.com"}
createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
    })
    .then((user) => 
    !user ? res.status(404).json({message: 'Post created, but no user to attach' }) : res.json('Created the post.'))
    .catch((err) => res.status(500).json(err));
},



// PUT update thought by it's _id
updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }
    )
    .then((thought) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
    })
    .then((user) => 
    !user ? res.status(404).json({message: 'Post created, but no user to attach' }) : res.json('Created the post.'))
    .catch((err) => res.status(500).json(err));
},



// DELETE a thought by it's _id
deleteThought(req, res) {
    Thought.findOneAndRemove(
        { _id: req.params.thoughtId }
    )
    .then((thought) => {
        return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId},
            { $pull: {thoughts: req.params.thoughtId}},
            { new: true }
        )
    })
    .then((user) =>
    !user ? res.status(404).json({message: 'Post deleted, but no user to attached' }) : res.json('Delted the post.'))
    .catch((err) => res.status(500).json(err))
}








}