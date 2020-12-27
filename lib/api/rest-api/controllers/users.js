const chista = require('../chista');

const UsersSignUp = require('../services/users/SignUp');
const UsersSignIn = require('../services/users/SignIn');

module.exports = {
    signUp : chista.makeServiceRunner(UsersSignUp, req => req.body),
    signIn : chista.makeServiceRunner(UsersSignIn, req => req.body)
};
