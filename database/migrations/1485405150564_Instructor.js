'use strict';

const Schema = use('Schema');

class InstructorSchema extends Schema {

  up() {
    this.create('instructors', (table) => {
      table.increments();
      table.integer('cohort_id').references('cohorts.id');
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('instructors');
  }

}

module.exports = InstructorSchema;
