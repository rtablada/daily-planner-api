const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return [
      'login',
      'email',
      'name',
      'avatar_url',
      'is_admin',
    ];
  }

  instructors() {
    return this.hasMany('App/Http/JsonApiViews/Instructor', {
      included: true,
      excludeRelation: 'user',
    });
  }

  student() {
    return this.belongsTo('App/Http/JsonApiViews/Student', {
      included: false,
      excludeRelation: 'user',
    });
  }

}

module.exports = User;
