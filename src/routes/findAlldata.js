const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize');


module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if (req.query.name) {
            const name = req.query.name;
            const limit = parseInt(req.query.limit) || 5

            if (name.length > 1) {
                return Pokemon.findAndCountAll({
                    where: {
                        name: {
                            [Op.like]: "%" + name + "%"
                        }
                    },
                    order: ['name'],
                    limit: limit
                }).then(({ count, rows }) => {
                    const msg = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name} `
                    res.json({ msg, data: rows })
                })
            } else {
                const msg = "Le terme de recherche doit contenir au minimum deux caractères";
                return res.status(400).json({ msg })
            }

        } else {
            Pokemon.findAll({ order: ['name'], }).then(pokemons => {
                const message = "La liste de pokemons a été bien trouvée";
                res.json({
                    message, data: pokemons
                })
            })
        }
    })
}