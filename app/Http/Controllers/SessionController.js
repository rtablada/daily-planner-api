'use strict';

const NE = require('node-exceptions');
const fetch = require('node-fetch');
const Env = use('Env');

const User = use('App/Model/User');
const Invite = use('App/Model/Invite');
const Student = use('App/Model/Student');
const clientId = Env.get('GITHUB_ID');
const secret = Env.get('GITHUB_SECRET');
const tokenUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}`;

class NotOkException extends NE.LogicalException {}
class NoInviteException extends NE.LogicalException {}

const basicResponse = (r) => {
  if (r.ok) {
    return r.json();
  }

  throw NotOkException(r.json());
};


class SessionController {

  * store(request, response) {
    const { 'auth-code': authCode } = request.all();

    try {
      const { access_token: accessToken, error } = yield fetch(`${tokenUrl}&code=${authCode}`, {
        headers: {
          Accept: 'application/json',
        },
      }).then(basicResponse);

      if (error) {
        throw NotOkException(error);
      }


      const ghUser = yield fetch(`https://api.github.com/user?access_token=${accessToken}`)
        .then(basicResponse);

      const userData = {
        login: ghUser.login,
        github_id: ghUser.id,
        email: ghUser.email,
        name: ghUser.name,
        avatar_url: ghUser.avatar_url,
        access_token: accessToken,
      };

      const user = yield User.query()
        .where({ login: ghUser.login }, userData).first();

      if (user) {
        const token = yield request.auth.generate(user);

        return response.json({ token });
      }

      const invite = yield Invite.query()
        .where({ login: ghUser.login }).first();

      if (invite) {
        const invitedUser = yield User.create(userData);

        const token = yield request.auth.generate(invitedUser);

        response.json({ token });

        yield Student.create({
          user_id: invitedUser.id,
          cohort_id: invite.cohort_id,
        });

        return yield invite.delete();
      }

      return response.status(401).json({
        errors: [
          {
            status: 401,
            title: 'No user was found for that user or you have not received an invite.',
          },
        ],
      });
    } catch (e) {
      console.log(e);

      response.status(401).json({
        errors: [
          {
            status: 401,
            title: 'User failed to log in.',
          },
        ],
      });
    }
  }
}

module.exports = SessionController;
