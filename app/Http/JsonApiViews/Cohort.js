const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Cohort extends JsonApiView {
  get attributes() {
    return ['name', 'start_date', 'campus'];
  }

  invites() {
    return this.hasMany('App/Http/JsonApiViews/Invite', {
      included: true,
      excludeRelation: 'cohort'
    });
  }

  students() {
    return this.hasMany('App/Http/JsonApiViews/Student', {
      included: true,
      excludeRelation: 'cohort'
    });
  }

  instructors() {
    return this.hasMany('App/Http/JsonApiViews/Instructor', {
      included: true,
      excludeRelation: 'cohort'
    });
  }

}

module.exports = Cohort;
