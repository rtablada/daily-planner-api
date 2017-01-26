'use strict'

const Lucid = use('Lucid')

class Instructor extends Lucid {


  cohort() {
    return this.belongsTo('App/Model/Cohort', 'id', 'cohort_id');
  }
  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Instructor
