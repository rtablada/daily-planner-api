'use strict';

const Instructor = use('App/Model/Instructor');

class InstructorController {

  * index(request, response) {
    const instructors = yield Instructor.with('cohort', 'user').fetch();

    response.jsonApi('Instructor', instructors);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      cohort_id: request.jsonApi.getRelationId('cohort'),
      user_id: request.jsonApi.getRelationId('user'),
    };
    const instructor = yield Instructor.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Instructor', instructor);
  }

  * show(request, response) {
    const id = request.param('id');
    const instructor = yield Instructor.with('cohort', 'user').where({ id }).firstOrFail();

    response.jsonApi('Instructor', instructor);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      cohort_id: request.jsonApi.getRelationId('cohort'),
      user_id: request.jsonApi.getRelationId('user'),
    };

    const instructor = yield Instructor.with('cohort', 'user').where({ id }).firstOrFail();
    instructor.fill(Object.assign({}, input, foreignKeys));
    yield instructor.save();

    response.jsonApi('Instructor', instructor);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const instructor = yield Instructor.query().where({ id }).firstOrFail();
    yield instructor.delete();

    response.status(204).send();
  }

}

module.exports = InstructorController;
