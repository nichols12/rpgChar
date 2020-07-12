const MongoClient = require('mongodb').MongoClient
const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('./User');
const assert = require('assert');

const sequelize = new Sequelize('rpgadmin','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'rpgChar';

// Create a new MongoClient
const client = new MongoClient(url);

class Char extends Model {

    newChar(attributes){
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
          
            const db = client.db(dbName);
            const char = db.collection('char');
            char.insert(attributes);
            char.find({}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");
                console.log(docs);
            }
            );
            client.close();
        });
    }
}

Char.init({
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    race:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize, modelName: 'Char'});

Char.User = Char.belongsTo(User);

module.exports = Char;