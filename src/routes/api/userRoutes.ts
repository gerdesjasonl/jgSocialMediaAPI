import { Router } from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser, addFriend, destroyFriend} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:_id').get(getUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:_id/friends').post(addFriend);

// /api/Users/:userId/friends/:friendId
router.route('/:_id/friends/:friendId').delete(destroyFriend);

export { router as userRouter} ;
