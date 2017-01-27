'use strict';

const Route = use('Route');

Route.post('/api/users', 'UserController.store');

Route.resource('/api/lessons', 'LessonController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/invites', 'InviteController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/instructors', 'InstructorController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/cohorts', 'CohortController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/students', 'StudentController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/users', 'UserController')
  .only(['index', 'show'])
  .middleware('auth');

Route.post('/api/token-auth', 'SessionController.store');
