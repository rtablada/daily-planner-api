const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return [
      'login',
      'email',
      'name',
      'avatar_url',
    ];
  }

}

module.exports = User;
