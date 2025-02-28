import { User, Thought } from "../models/index.js";
// GET all users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find()
            .select('-__v');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// GET a user by user _id
export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params._id })
            .select('-__v');
        if (!user) {
            return;
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// POST a new user
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// PUT update to user by _id
export const updateUser = async (req, res) => {
    console.log('Currently Updating User');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate({ _id: req.params._id }, { $addToSet: { username: req.body.username } }, { runValidators: true, new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with that Id' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// DELETE to remove user by _id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params._id });
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        // This will search for any associated thoughts and delete them.
        const thoughts = await Thought.deleteMany({ _id: req.params._id });
        if (!thoughts) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }
        return res.json({ message: 'User successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// This adds a friend by friendId to the User friends array
export const addFriend = async (req, res) => {
    console.log(req.body);
    const friendId = req.body._id;
    const userId = req.params._id;
    try {
        const user = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { runValidators: true, new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with that Id' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// This finds and deletes Friend by friendId from user friends array
export const destroyFriend = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate({ _id: req.params._id }, { $pull: { friends: req.body._id } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with that Id' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
