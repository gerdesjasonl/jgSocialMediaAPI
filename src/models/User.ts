import { Schema, model, type Document} from 'mongoose';

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

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[],
}

const userSchema = new Schema<IUser>({
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

    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true
    },
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    })
    
const User = model<IUser>('User', userSchema);

export default User;
