'use strict';

const Schema = use('Schema');

class UsersTableSchema extends Schema {

  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('login').notNullable().unique();
      table.string('github_id').notNullable().unique();
      table.string('email');
      table.string('access_token');
      table.string('name');
      table.string('avatar_url');

      table.boolean('is_admin').default(false);
      // table.string('email', 254).notNullable().unique();
      // table.string('password', 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }

}

module.exports = UsersTableSchema;
