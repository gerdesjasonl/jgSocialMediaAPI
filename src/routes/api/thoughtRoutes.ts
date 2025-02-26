import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  // getCourseById,
  // createCourse,
  // updateCourse,
  // deleteCourse,
} from '../../controllers/thoughtController.js';

// /api/courses
router.route('/').get(getAllThoughts)
// .post(createCourse);

// /api/courses/:courseId
// router
//   .route('/:courseId')
//   .get(getCourseById)
//   .put(updateCourse)
//   .delete(deleteCourse);

export { router as thoughtRouter };
