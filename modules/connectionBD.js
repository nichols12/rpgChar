const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rpgadmin','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been stabilished success');
    
} catch (error) {
    console.error('Unable to connect to the database:', error);
    
}
