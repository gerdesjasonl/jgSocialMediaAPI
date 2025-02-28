import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50,
        match: /^\S+@\S+\.\S+$/
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }]
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true
});
userSchema
    .virtual('friendCount')
    .get(function () {
    return this.friends.length;
});
const User = model('User', userSchema);
export default User;
