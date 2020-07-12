const { passwordHash, passwordVerify, } = require('nodejs-password');

const salt = 'is a word to salt';

class PasswordUtils {
    async createHash (password){
        let hash = '';
        try {
            hash = await passwordHash(password, salt);
        } catch (error) {
            console.error('error on createHash', error);
        }
        return hash;
    }
    
    async passwordVerify (password, hash){
        return passwordVerify(password, hash, salt);
    }
};


module.exports = PasswordUtils;

