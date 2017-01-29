'use strict';

const Lucid = use('Lucid');
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

  instructors() {
    return this.hasMany('App/Model/Instructor');
  }

  students() {
    return this.hasMany('App/Model/Student');
  }
}

guarded(User);

module.exports = User;
