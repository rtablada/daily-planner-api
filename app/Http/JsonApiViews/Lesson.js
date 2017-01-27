const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Lesson extends JsonApiView {
  get attributes() {
    return ['public_notes', 'instructor_notes', 'date', 'visible', 'week', 'day'];
  }

  cohort() {
    return this.belongsTo('App/Http/JsonApiViews/Cohort', {
      included: true,
      excludeRelation: 'lessons'
    });
  }

}

module.exports = Lesson;
