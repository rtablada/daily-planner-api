'use strict';

const User = use('App/Model/User');

class UserController {

  * index(request, response) {
    const users = yield User.with().fetch();

    response.jsonApi('User', users);
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.with().where({ id }).firstOrFail();

    response.jsonApi('User', user);
  }

  * current(request, response) {
    const user = request.currentUser;

    yield user.related('instructors.cohort', 'student.cohort').load();

    response.jsonApi('User', user);
  }

}

module.exports = UserController;
