'use strict';

const Lucid = use('Lucid');

class Cohort extends Lucid {
  invites() {
    return this.hasMany('App/Model/Invite', 'id', 'cohort_id');
  }

  students() {
    return this.hasMany('App/Model/Student', 'id', 'cohort_id');
  }

  lessons() {
    return this.hasMany('App/Model/Lesson', 'id', 'cohort_id');
  }

  instructors() {
    return this.hasMany('App/Model/Instructor', 'id', 'cohort_id');
  }
}

module.exports = Cohort;
