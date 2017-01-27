'use strict';

const Schema = use('Schema');

class LessonSchema extends Schema {

  up() {
    this.create('lessons', (table) => {
      table.increments();
      table.text('public_notes');
      table.text('instructor_notes');
      table.integer('cohort_id').references('cohorts.id');
      table.date('date');
      table.boolean('visible');
      table.string('week');
      table.string('day');
      table.timestamps();
    });
  }

  down() {
    this.drop('lessons');
  }

}

module.exports = LessonSchema;
