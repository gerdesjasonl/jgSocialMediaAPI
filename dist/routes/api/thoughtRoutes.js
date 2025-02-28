import { Router } from 'express';
import { getAllThoughts, getThought, createThought, updateThought, deleteThought, addReaction, destroyReaction } from '../../controllers/thoughtController.js';
const router = Router();
// /api/thoughts
router.route('/').get(getAllThoughts);
router.route('/:UserId/thoughts').post(createThought);
// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(destroyReaction);
export { router as thoughtRouter };
