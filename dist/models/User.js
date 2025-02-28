import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
// const friend = new Schema({
//     friendId: {
//         type: Schema.Types.ObjectId,
//         default: () => new Types.ObjectId(),
//     },
//     username: {
//         type: String,
//         required: true,
//     },
//     befriendedAt: {
//         type: Date,
//     }
// });
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        max_length: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        max_length: 50,
        match: /^\S+@\S+\.\S+$/
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
    friends: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: { type: String, required: true },
            befriendedAt: { type: Date },
        }
    ]
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
