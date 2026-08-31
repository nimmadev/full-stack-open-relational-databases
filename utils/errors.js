class AuthenticationError extends Error {
  constructor(message = "Authentication error") {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

module.exports = { AuthenticationError };
