'use strict';

const Schema = use('Schema');

class InviteSchema extends Schema {

  up() {
    this.create('invites', (table) => {
      table.increments();
      table.integer('cohort_id').references('cohorts.id');
      table.boolean('instructor');
      table.string('login');
      table.timestamps();
    });
  }

  down() {
    this.drop('invites');
  }

}

module.exports = InviteSchema;
