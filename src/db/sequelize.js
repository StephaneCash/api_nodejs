const { Sequelize, DataTypes } = require('sequelize');
const PkemonModel = require('../models/pokemon');
const pokemons = require('./pocekmonList');

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

const initDB = () => {
    return sequelize.sync({ force: true })
        .then(rep => {
            pokemons.map((pokemon) => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types
                }).then(bulbizarre => console.log(bulbizarre.toJSON()))
            })
        });
}

module.exports = {
    initDB, Pokemon
}
