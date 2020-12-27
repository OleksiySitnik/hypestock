const X                 = require('chista/Exception').default;
const BaseService       = require('../BaseService');
const users             = require('../../../../repositories/users');
const { checkPassword } = require('../../../../utils/hashing');
const { generateToken } = require('../../../../utils/token');

class SignIn extends BaseService {
    validate(data) {
        return this.doValidation(data, {
            email    : [ 'required', 'email' ],
            password : [ 'required', 'string', { min_length: 8 } ]
        });
    }

    async execute(data) {
        const { email, password } = data;

        const user = await users.findByEmail(email);
        if (!user) {
            throw new X({
                code: 'NOT_FOUND',
                fields: {
                    email: 'NOT_FOUND'
                }
            });
        }

        const isCorrectPassword = await checkPassword(password, user.password_hash);
        if (!isCorrectPassword) {
            throw new X({
                code: 'BAD_CREDENTIALS',
                fields: {
                    password: 'BAD_CREDENTIALS'
                }
            });
        }

        const token = generateToken(user);

        return {
            status : 1,
            data   : {
                token
            }
        };
    }
}

module.exports = SignIn;
