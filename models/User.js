const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');


// Schema to create new User model
const userSchema =  new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
            },
        }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }]
},
{
    toJSON: { // You have to tell Mongoose to enable virtuals
        virtuals: true
    }
});

// Virtuals are document properties that you can get and set but that do not get persisted to MongoDB.
// The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage.
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);


// Creating new instances of Users
User.create(
    {username: 'user1', email: 'user1@mail.com'},
    {username: 'user2', email: 'user2@mail.com'},
    {username: 'user3', email: 'user3@mail.com'},
    {username: 'user4', email: 'user4@mail.com'},
    (err, data) => {
        if (err) {
            console.log(err);
        }
    }
);

module.exports = User;
