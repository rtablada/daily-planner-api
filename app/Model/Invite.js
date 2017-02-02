'use strict';

const Lucid = use('Lucid');
const Student = use('App/Model/Student');
const Instructor = use('App/Model/Instructor');

class Invite extends Lucid {

  cohort() {
    return this.belongsTo('App/Model/Cohort', 'id', 'cohort_id');
  }

  * convert(user) {
    console.log('converting');
    if (this.instructor) {
      console.log('creating instructor...');
      const instructor = yield Instructor.create({
        user_id: user.id,
        cohort_id: this.cohort_id,
      });

      console.log('created instructor: ', instructor.toJSON());
    } else {
      const student = yield Student.create({
        user_id: user.id,
        cohort_id: this.cohort_id,
      });
      console.log('created student: ', student.toJSON());
    }

    return yield this.delete();
  }

}

module.exports = Invite;
