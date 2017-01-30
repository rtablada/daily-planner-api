'use strict';

const Invite = use('App/Model/Invite');
const attributes = ['login', 'instructor'];

class InviteController {

  * index(request, response) {
    const invites = yield Invite.with('cohort').fetch();

    response.jsonApi('Invite', invites);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      cohort_id: request.jsonApi.getRelationId('cohort'),
    };

    yield request.currentUser.assertIsInstructorForCohort(request.jsonApi.getRelationId('cohort'));

    const invite = yield Invite.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Invite', invite);
  }

  * show(request, response) {
    const id = request.param('id');
    const invite = yield Invite.with('cohort').where({ id }).firstOrFail();

    response.jsonApi('Invite', invite);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      cohort_id: request.jsonApi.getRelationId('cohort'),
    };

    yield request.currentUser.assertIsInstructorForCohort(request.jsonApi.getRelationId('cohort'));

    const invite = yield Invite.with('cohort').where({ id }).firstOrFail();
    invite.fill(Object.assign({}, input, foreignKeys));
    yield invite.save();

    response.jsonApi('Invite', invite);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const invite = yield Invite.query().where({ id }).firstOrFail();
    yield invite.delete();

    response.status(204).send();
  }

}

module.exports = InviteController;
