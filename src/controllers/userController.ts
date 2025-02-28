import { User, Thought } from "../models/index.js";
import { Request, Response } from "express";
import mongoose from "mongoose";


// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find()
        .select('-__v');
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}
// GET a user by user _id
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({_id: req.params.UserId})
            .select('-__v');
        
        if (!user) {
            return;
        } else {
            res.json(user);
        }   
    } catch (err) {
        res.status(500).json(err);
    }
}
// POST a new user
export const createUser = async(req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}
// PUT update to user by _id
export const updateUser = async (req: Request, res: Response) => {
    console.log('Currently Updating User');
    try {
        const user = await User.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.UserId) },
            { $set: { username: req.body.username } },
                { runValidators: true, new: true }
            );
            console.log(req.params.UserId);
        if (!user) {
            return res.status(404).json({message: 'No user found with that Id'});
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
// DELETE to remove user by _id
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.UserId});

        if (!user) {
            return res.status(404).json({message: 'No such user exists'});
        }
        // This will search for any associated thoughts and delete them.
        const thoughts = await Thought.deleteMany({ userId: user._id });

        if (thoughts.deletedCount === 0) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
// This adds a friend by userId to the User friends array
export const addFriend = async (req: Request, res: Response) => {
    console.log('error')
try {
    const userId = req.params.UserId;
    const friend = new mongoose.Types.ObjectId(req.params.friendId); 
    if (!friend) {
        return res.status(404).json({ message: 'Friend not found' });
    }
    const user = await User.findByIdAndUpdate(
        {_id: userId},
        { $addToSet: { friends: friend } },
        { runValidators: true, new: true }
    ).populate('friends');
    
    if (!user) {
        return res.status(404).json({message: 'No user found with that Id'});
    }
    return res.json(user);
} catch (err) {
    return res.status(500).json(err);
}
}


    
// This finds and deletes Friend by friendId from user friends array
// export const destroyFriend = async (req: Request, res: Response) => {
//     try {
//         const user = await User.findByIdAndUpdate(
//             req.params._id,
//             { $pull: {friends: req.params._id } },
//             {new: true}
//         );
//         if (!user) {
//             return res.status(404).json({message: 'No user found with that Id'});
//         }
//         return res.json(user);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// }

export const destroyFriend = async (req: Request, res: Response) => {
    try {
        const userId = req.params.UserId;
        const friendId = new mongoose.Types.ObjectId(req.params.friendId); // Convert to ObjectId

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } }, // Remove friend by ObjectId
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};