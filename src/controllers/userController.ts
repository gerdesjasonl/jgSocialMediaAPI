import { User, Thought } from "../models/index.js";
import { Request, Response } from "express";


// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}
// GET a user by user id
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({_id: req.params.userId})
            .select('-__v');
        
        if (!user) {
            res.status(404).json({message: 'No user with that ID'});
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
    console.log (req.body);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {thoughts: req.body } },
            { runValidators: true, new: true }
        );
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
        const user = await User.findOneAndDelete({_id: req.params.userId});

        if (!user) {
            return res.status(404).json({message: 'No such user exists'});
        }
        // This will search for any associated thoughts and delete them.
        const thoughts = await Thought.deleteMany({ userId: req.params.userId });

        if (!thoughts) {
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