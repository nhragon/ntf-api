const config = require('modules/config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class Auth {
  constructor(options = {}) {
    this.options = {
      algorithms: config.JWT_ALGORITHMS,
      expiresIn: config.JWT_EXPIRES_IN_SEC,
      secret: config.JWT_ADMIN_SECRET,
      issuer: config.JWT_ADMIN_KEY,
      secretRefresh: config.JWT_REFRESH_SECRET,
      issuerRefresh: config.JWT_REFRESH_KEY,
      ...options,
    };
  }

  sha256(data, secret = this.options.secret) {
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }

  generateJWT(data, expiresIn = this.options.expiresIn) {
    return jwt.sign({ data }, this.options.secret, {
      expiresIn,
      algorithm: this.options.algorithms,
      issuer: this.options.issuer,
    });
  }

  verifyJWT(token) {
    try {
      const result = jwt.verify(token, this.options.secret, {
        algorithms: this.options.algorithms,
        issuer: this.options.issuer,
        ignoreExpiration: false,
      });
      return [null, result];
    } catch (error) {
      return [error];
    }
  }

  generateRefreshJWT(data, expiresIn = this.options.expiresIn) {
    return jwt.sign({ data }, this.options.secretRefresh, {
      expiresIn,
      algorithm: this.options.algorithms,
      issuer: this.options.issuerRefresh,
    });
  }

  verifyRefreshJWT(token) {
    try {
      const result = jwt.verify(token, this.options.secretRefresh, {
        algorithms: this.options.algorithms,
        issuer: this.options.issuerRefresh,
        ignoreExpiration: false,
      });
      return [null, result];
    } catch (error) {
      return [error];
    }
  }
}

module.exports = (options) => new Auth(options);
