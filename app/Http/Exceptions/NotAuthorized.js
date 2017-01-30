const NE = require('node-exceptions');

class NotAuthorizedException extends NE.LogicalException {
}

module.exports = NotAuthorizedException;
