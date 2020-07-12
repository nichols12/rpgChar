const { Sequelize, DataTypes, Model } = require('sequelize');
const PasswordUtils = require('../modules/PasswordUtils');
const sequelize = new Sequelize('rpgadmin','root','',{
    host: 'localhost',
    dialect: 'mysql'
});
const passwordUtils = new PasswordUtils();


class User extends Model {

    __isValidString(string){
        if (typeof string != 'string' || string.trim() == '') {
            return false;
        }
        return true;
    }

    async newUser(username, password){
        
        if (!this.__isValidString(username)) {
            console.error('sommenting wrong with the username', username);
            return false
        }
        if (!this.__isValidString(username)) {
            console.error('sommenting wrong with the password', password);
            return false 
        }

        const user = await User.findAll({where:{username:username}});
        console.log(user);
        
        if (user.length == 0) {
            const hash = await passwordUtils.createHash(password);
            let newUser = await User.create({username:username, password:hash});
            console.log('created User : ', newUser);
            return true;
        }
    }

    async getUserInfo(username){
        if (!this.__isValidString(username)) {
            console.error('sommenting wrong with the username', username);
            return false
        }
        let user = await User.findOne({where:{username:username}});
        return user;
    }

    async getUserInfoWithPassword(username, password) {
        
        if (!this.__isValidString(username)) {
            console.error('sommenting wrong with the username', username);
            return false
        }
        if (!this.__isValidString(username)) {
            console.error('sommenting wrong with the password', password);
            return false 
        }
        
        let userInfo = await this.getUserInfo(username);
        
        if (userInfo != null) {
            let hash = userInfo.dataValues.password;
            let isCorrect = await passwordUtils.passwordVerify(password, hash);
            if (isCorrect) {
                return userInfo.dataValues;
            }
        }
        return false
    }

}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    accountType:{
        type:DataTypes.STRING
    }
}, {sequelize, modelName: 'User'});


module.exports = User;