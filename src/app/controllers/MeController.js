const Course = require('../models/Course');

class MeController {
   // [GET] /me/stored/courses
   async storedCourses(req, res, next) {
      try {
         const courses = await Course.find({}).lean();
         const deleteCount = await Course.countDocumentsWithDeleted({ deleted: true });
         res.render('me/storedCourses', { courses, deleteCount });
      } catch (next) {
         next();
      }
   }

   // [GET] /me/trash/courses
   trashCourses(req, res, next) {
      Course.findWithDeleted({ deleted: true })
         .lean()
         .then((courses) => res.render('me/trashCourses', { courses }))
         .catch(next);
   }
}

module.exports = new MeController();
