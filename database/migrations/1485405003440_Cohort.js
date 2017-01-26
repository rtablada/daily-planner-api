'use strict';

const Schema = use('Schema');

class CohortSchema extends Schema {

  up() {
    this.create('cohorts', (table) => {
      table.increments();


      table.string('name');
      table.date('start_date');
      table.string('campus');
      table.timestamps();
    });
  }

  down() {
    this.drop('cohorts');
  }

}

module.exports = CohortSchema;
