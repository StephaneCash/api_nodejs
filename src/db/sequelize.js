const { Sequelize, DataTypes } = require('sequelize');
const PkemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
const pokemons = require('./pocekmonList');
const bcrypt = require('bcrypt')

const sequelize = new Sequelize(
    'pokemons', 'root', '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

const Pokemon = PkemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDB = () => {
    return sequelize.sync({ force: true }).then(rep => {
        pokemons.map((pokemon) => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(bulbizarre => console.log(bulbizarre.toJSON()))
        })

        bcrypt.hash('stephcash', 10)
            .then(hash => User.create({ username: 'steph', password: hash }))
            .then(user => console.log(user.toJSON()))
    });
}

module.exports = {
    initDB, Pokemon, User
}
