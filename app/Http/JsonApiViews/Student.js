const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Student extends JsonApiView {
  get attributes() {
    return [];
  }

  cohort() {
    return this.belongsTo('App/Http/JsonApiViews/Cohort', {
      included: true,
      excludeRelation: 'students'
    });
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'student'
    });
  }

}

module.exports = Student;
