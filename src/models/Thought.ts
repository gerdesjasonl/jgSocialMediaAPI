import { Schema, model, Types, type Document} from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: [typeof reaction],
}

const reaction = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: true,
    }
},
{
    toJSON: {
        getters: true,
    }
}

);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
        
        username: {
            type: String,
            required: true,
        },
        
        reactions: [reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        timestamps: true
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    })

const Thought = model('Thought', thoughtSchema);

export default Thought;
