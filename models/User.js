const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create new User model
const userSchema = new Schema({
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
    thoughts: [thoughtSchema],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: userSchema,
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

module.exports = User;