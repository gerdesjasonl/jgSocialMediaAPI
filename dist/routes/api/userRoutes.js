import { Router } from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser, addFriend, destroyFriend } from '../../controllers/userController.js';
const router = Router();
// /api/users
router.route('/').get(getAllUsers).post(createUser);
// /api/users/:userId
router.route('/:UserId').get(getUser).put(updateUser).delete(deleteUser);
// /api/users/:userId/friends
// router.route('/:UserId/friends');
// /api/Users/:userId/friends/:friendId
router.route('/:UserId/friends/:friendId').delete(destroyFriend).post(addFriend);
export { router as userRouter };
