const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Invite extends JsonApiView {
  get attributes() {
    return ['login', 'instructor'];
  }

  cohort() {
    return this.belongsTo('App/Http/JsonApiViews/Cohort', {
      included: true,
      excludeRelation: 'invites'
    });
  }

}

module.exports = Invite;
