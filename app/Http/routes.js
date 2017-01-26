'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.post('/api/users', 'UserController.store');

Route.resource('/api/invites', 'InviteController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/cohorts', 'CohortController')
  .except(['create', 'edit'])
  .middleware('auth');

Route.resource('/api/users', 'UserController')
  .only(['index', 'show'])
  .middleware('auth');

Route.post('/api/token-auth', 'SessionController.store');
