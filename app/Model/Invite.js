'use strict';

const Lucid = use('Lucid');
const Student = use('App/Model/Student');
const Instructor = use('App/Model/Instructor');

class Invite extends Lucid {

  cohort() {
    return this.belongsTo('App/Model/Cohort', 'id', 'cohort_id');
  }

  * convert(user) {
    if (this.instructor) {
      yield Instructor.create({
        user_id: invitedUser.id,
        cohort_id: invite.cohort_id,
      });
    } else {
      yield Student.create({
        user_id: invitedUser.id,
        cohort_id: invite.cohort_id,
      });
    }

    return yield this.delete();
  }

}

module.exports = Invite;
