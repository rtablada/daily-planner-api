'use strict';

const Lesson = use('App/Model/Lesson');
const attributes = ['public-notes', 'instructor-notes', 'date', 'visible', 'week', 'day'];

class LessonController {

  * index(request, response) {
    const lessons = yield Lesson.with('cohort').fetch();

    response.jsonApi('Lesson', lessons);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      cohort_id: request.jsonApi.getRelationId('cohort'),
    };

    yield request.currentUser.assertIsInstructorForCohort(request.jsonApi.getRelationId('cohort'));

    const lesson = yield Lesson.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Lesson', lesson);
  }

  * show(request, response) {
    const id = request.param('id');
    const lesson = yield Lesson.with('cohort').where({ id }).firstOrFail();

    response.jsonApi('Lesson', lesson);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      cohort_id: request.jsonApi.getRelationId('cohort'),
    };

    yield request.currentUser.assertIsInstructorForCohort(request.jsonApi.getRelationId('cohort'));

    const lesson = yield Lesson.with('cohort').where({ id }).firstOrFail();
    lesson.fill(Object.assign({}, input, foreignKeys));
    yield lesson.save();

    response.jsonApi('Lesson', lesson);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const lesson = yield Lesson.query().where({ id }).firstOrFail();
    yield lesson.delete();

    response.status(204).send();
  }

}

module.exports = LessonController;
