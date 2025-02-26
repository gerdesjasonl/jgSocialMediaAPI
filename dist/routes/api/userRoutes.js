import { Router } from 'express';
const router = Router();
import { getAllUsers,
// getUserById,
// createUser,
// deleteUser,
// addAssignment,
// removeAssignment,
 } from '../../controllers/userController.js';
// /api/Users
router.route('/').get(getAllUsers);
// .post(createUser);
// // /api/Users/:UserId
// router.route('/:UserId').get(getUserById).delete(deleteUser);
// // /api/Users/:UserId/assignments
// router.route('/:UserId/assignments').post(addAssignment);
// // /api/Users/:UserId/assignments/:assignmentId
// router.route('/:UserId/assignments/:assignmentId').delete(removeAssignment);
export { router as userRouter };
