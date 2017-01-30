'use strict';

const Student = use('App/Model/Student');

class StudentController {

  * index(request, response) {
    const students = yield Student.with('cohort', 'user').fetch();

    response.jsonApi('Student', students);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      cohort_id: request.jsonApi.getRelationId('cohort'),
      user_id: request.jsonApi.getRelationId('user'),
    };

    yield request.currentUser.assertIsInstructorForCohort(request.jsonApi.getRelationId('cohort'));

    const student = yield Student.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Student', student);
  }

  * show(request, response) {
    const id = request.param('id');
    const student = yield Student.with('cohort', 'user').where({ id }).firstOrFail();

    response.jsonApi('Student', student);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      cohort_id: request.jsonApi.getRelationId('cohort'),
      user_id: request.jsonApi.getRelationId('user'),
    };

    yield request.currentUser.assertIsInstructorForCohort(request.jsonApi.getRelationId('cohort'));

    const student = yield Student.with('cohort', 'user').where({ id }).firstOrFail();
    student.fill(Object.assign({}, input, foreignKeys));
    yield student.save();

    response.jsonApi('Student', student);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const student = yield Student.query().where({ id }).firstOrFail();
    yield student.delete();

    response.status(204).send();
  }

}

module.exports = StudentController;
