const X                = require('chista/Exception').default;
const BaseService      = require('../BaseService');
const users            = require('../../../../repositories/users');
const { hashPassword } = require('../../../../utils/hashing');

class SignUp extends BaseService {
    validate(data) {
        return this.doValidation(data, {
            email    : [ 'required', 'email' ],
            password : [ 'required', 'string', { min_length: 8  } ]
        });
    }

    async execute(data) {
        const { email, password } = data;

        const user = await users.findByEmail(email);
        if (user) {
            throw new X({
                code   : 'ALREADY_EXISTS',
                fields : {
                    email : 'ALREADY_EXISTS'
                }
            });
        }

        const passwordHash = await hashPassword(password);

        await users.create(email, passwordHash);

        return {
            status : 1,
            data   : {
                email
            }
        };
    }
}

module.exports = SignUp;
