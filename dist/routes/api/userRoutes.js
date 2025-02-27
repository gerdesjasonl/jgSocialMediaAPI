import { Router } from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser, addFriend, destroyFriend } from '../../controllers/userController.js';
const router = Router();
// /api/Users
router.route('/').get(getAllUsers).post(createUser);
// /api/Users/:UserId
router.route('/:UserId').get(getUser).put(updateUser).delete(deleteUser);
// /api/Users/:UserId/friends
router.route('/:UserId/friends').post(addFriend);
// /api/Users/:UserId/friends/:friendId
router.route('/:UserId/friends/:friendId').delete(destroyFriend);
export { router as userRouter };
