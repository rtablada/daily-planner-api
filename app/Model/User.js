'use strict';

const NotAuthorizedException = use('App/Http/Exceptions');
const Lucid = use('Lucid');

const Instructor = use('App/Model/Instructor');
const guarded = require('./guard-mixin');

class User extends Lucid {
  static get fillable() {
    return [
      'login',
      'github_id',
      'email',
      'name',
      'avatar_url',
      'access_token',
    ];
  }

  * isInstructorForCohort(cohortId) {
    const instructor = yield Instructor.query().where({
      cohort_id: cohortId,
      user_id: this.id,
    }).first();

    return !!instructor;
  }

  * assertIsInstructorForCohort(cohortId) {
    if (!(yield this.isInstructorForCohort(cohortId))) {
      throw new NotAuthorizedException('You are not an instructor for the designatd cohort');
    }
  }

  instructors() {
    return this.hasMany('App/Model/Instructor');
  }

  students() {
    return this.hasMany('App/Model/Student');
  }
}

guarded(User);

module.exports = User;
