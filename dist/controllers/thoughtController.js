import { Thought, User } from "../models/index.js";
// Get all thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Get a thought by _id
export const getThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params._id })
            .select('-__v');
        if (!thought) {
            return;
        }
        else {
            res.json(thought);
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
    return;
};
// POST a new thought and push to user thoughts array
export const createThought = async (req, res) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: dbThoughtData._id } }, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(dbThoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
    return;
};
// PUT to update a thought by _id
export const updateThought = async (req, res) => {
    console.log('Currently Updating Thought');
    console.log(req.body);
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params._id }, { $addToSet: { thoughts: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that Id' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// DELETE to remove a thought by _id
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params._id });
        if (!thought) {
            return res.status(404).json({ message: 'No thought exists' });
        }
        return res.json({ message: 'Thought successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// POST to create a reaction and store it in a thought's reactions array
export const addReaction = async (req, res) => {
    console.log(req.body);
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params._id }, { $addToSet: { reactions: req.body._id } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that Id' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// This finds and deletes a reaction by reactionId from Thought reactions array
export const destroyReaction = async (req, res) => {
    console.log(req.body);
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params._id }, { $pull: { reactions: req.body._id } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that Id' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
