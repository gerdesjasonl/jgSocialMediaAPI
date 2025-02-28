import { Router } from 'express';
import { getAllThoughts, getThought, createThought, updateThought, deleteThought, addReaction, destroyReaction } from '../../controllers/thoughtController.js';
const router = Router();
// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
// /api/thoughts/:thoughtId
router.route('/:_id').get(getThought).put(updateThought).delete(deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:_id/reactions').post(addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:_id/reactions/:reactionId').delete(destroyReaction);
export { router as thoughtRouter };
