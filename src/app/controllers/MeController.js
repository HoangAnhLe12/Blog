const Course = require('../models/Course');

class MeController {
   // [GET] /me/stored/courses
   storedCourses(req, res, next) {
      let courses = Course.find({}).lean();

      Promise.all([courses.sortable(req), Course.countDocumentsWithDeleted({ deleted: true })])
         .then(([courses, deleteCount]) =>
            res.render('me/storedCourses', {
               courses,
               deleteCount,
            }),
         )
         .catch(next);
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
