import { Schema, model, type Document} from 'mongoose';

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
        max_length: 50,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        max_length: 50,
        match: /^\S+@\S+\.\S+$/
    },

    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Friend',
    }]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    }


});

const User = model('User', userSchema);

export default User;
