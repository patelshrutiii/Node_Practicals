const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const encryptPassword = (password) => {
   return bcrypt.hash(password,salt).then(hash => hash).catch(error => error);
}

module.exports = encryptPassword;