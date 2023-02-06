const { Schema, model, default: mongoose } = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
    }
},
{
    toJSON: { // You have to tell Mongoose to enable virtuals
        virtuals: true,
        getters: true
    }
}
);


const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (date) => date.toLocaleDateString("en-US") // can use slice probably to rought it out if needed
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
{
    toJSON: { // You have to tell Mongoose to enable Virtuals
        virtuals: true,
        getters: true
    }
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

Thought.create(
    {thoughtText: 'Commodo occaecat minim qui laborum.', username: 'user1'},
    {thoughtText: 'Consectetur ex ex aliquip mollit anim qui culpa aliqua sunt eiusmod.', username: 'user1'},
    {thoughtText: 'Minim sunt do dolor mollit ex eiusmod pariatur cupidatat duis esse et deserunt eu.', username: 'user1'}
)


module.exports = Thought;