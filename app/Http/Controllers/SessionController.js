'use strict';

const User = use('App/Model/User');
const E = require('node-exceptions');
const fetch = require('node-fetch');
const Env = use('Env');
const clientId = Env.get('GITHUB_ID');
const secret = Env.get('GITHUB_SECRET');
const tokenUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}`;

const basicResponse = (r) => {
  if (r.ok) {
    return r.json();
  }

  throw E(r.json());
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
        throw E(error);
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

      const user = yield User.findOrCreate({ login: ghUser.login }, userData);

      const token = yield request.auth.generate(user);
      response.json({ token });
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
