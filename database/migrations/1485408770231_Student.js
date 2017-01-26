'use strict';

const Schema = use('Schema');

class StudentSchema extends Schema {

  up() {
    this.create('students', (table) => {
      table.increments();
      table.integer('cohort_id').references('cohorts.id');
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('students');
  }

}

module.exports = StudentSchema;
