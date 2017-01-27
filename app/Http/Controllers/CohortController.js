'use strict';

const Cohort = use('App/Model/Cohort');
const Instructor = use('App/Model/Instructor');
const attributes = ['name', 'start-date', 'campus'];

class CohortController {

  * index(request, response) {
    const cohorts = yield Cohort.with('lessons', 'invites', 'students.user', 'instructors.user').fetch();

    response.jsonApi('Cohort', cohorts);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const user = request.currentUser;

    const cohort = yield Cohort.create(input);

    const instructor = yield Instructor.create({
      cohort_id: cohort.id,
      user_id: user.id,
    });

    cohort.instructors = [instructor];

    response.jsonApi('Cohort', cohort);
  }

  * show(request, response) {
    const id = request.param('id');
    const cohort = yield Cohort.with('lessons', 'invites', 'students.user', 'instructors.user').where({ id }).firstOrFail();

    response.jsonApi('Cohort', cohort);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const cohort = yield Cohort.with('lessons', 'invites', 'students.user', 'instructors.user').where({ id }).firstOrFail();
    cohort.fill(Object.assign({}, input, foreignKeys));
    yield cohort.save();

    response.jsonApi('Cohort', cohort);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const cohort = yield Cohort.query().where({ id }).firstOrFail();
    yield cohort.delete();

    response.status(204).send();
  }

}

module.exports = CohortController;
