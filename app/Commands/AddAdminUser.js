'use strict';

const Command = use('Command');
const User = use('App/Model/User');
const fetch = use('node-fetch');

class AddAdminUser extends Command {

  get signature() {
    return 'make:user';
  }

  get description() {
    return 'Tell something helpful about this command';
  }

  * handle(args) {
    const username = yield this.ask('Enter an github username').print();

    const res = yield fetch(`https://api.github.com/users/${username}`);

    if (res.ok) {
      const ghUser = yield res.json();

      const userData = {
        login: ghUser.login,
        github_id: ghUser.id,
        email: ghUser.email,
        name: ghUser.name,
        avatar_url: ghUser.avatar_url,
        is_admin: true,
      };

      try {
        const user = yield User.create(userData);

        this.completed('create', `An admin with the Github username ${user.login} has been created.`);
      } catch (e) {
        console.log(e);

        this.failed('create', 'There was an error creating this user');
      }

      process.exit();
    } else {
      this.failed('create', `There is no user with the username ${username}`);

      return process.exit();
    }
  }

}

module.exports = AddAdminUser;
