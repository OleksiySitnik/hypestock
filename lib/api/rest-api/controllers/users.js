const chista = require('../chista');

const UsersSignUp = require('../services/users/SignUp');

module.exports = {
    signUp : chista.makeServiceRunner(UsersSignUp, req => req.body)
};
