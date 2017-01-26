const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Instructor extends JsonApiView {
  get attributes() {
    return [];
  }

  cohort() {
    return this.belongsTo('App/Http/JsonApiViews/Cohort', {
      included: true,
      excludeRelation: 'instructors'
    });
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'instructors'
    });
  }

}

module.exports = Instructor;
