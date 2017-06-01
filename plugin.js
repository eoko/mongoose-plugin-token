const randomToken = require('random-token');

module.exports = function tokenPlugin(schema, opt) {
  const defaultOptions = {
    fieldName: 'token',
    createIndex: true,
    tokenLength: 64,
  };

  const options       = opt || {};
  options.fieldName   = options.fieldName || defaultOptions.fieldName;
  options.createIndex = options.createIndex || defaultOptions.createIndex;
  options.tokenLength = options.tokenLength || defaultOptions.tokenLength;

  const tokenSchema              = {};
  tokenSchema[options.fieldName] = { type: String };

  schema.add(tokenSchema);

  if (options.createIndex) {
    schema
      .path(options.fieldName)
      .index({ unique: true, sparse: true });
  }

  schema.pre('save', function save(next) {
    if (this.isNew) this.token = randomToken(options.tokenLength);
    next();
  });
};
