const validTypes = [
    'Plante', 'Poisson', 'Eau', 'Feu', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'
];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Ceci est un champ obligatoire !" }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement les nombres entiers svp.' },
                notNull: { msg: 'Ceci est une propriété requise' },
                min: {
                    args: [0],
                    msg: 'Les points de vie doivent être sup ou égals à 0'
                },
                max: {
                    args: [100],
                    msg: 'Les points de vie doivent être sup ou égals à 0'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement les nombres entiers svp.' },
                notNull: { msg: 'Ceci est une propriété requise' },
                min: {
                    args: [0],
                    msg: 'Les cp doivent être sup ou égals à 0'
                },
                max: {
                    args: [990],
                    msg: 'Les cp doivent être sup ou égals à 0'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: 'Utilisez une URL image svp.' },
                notNull: { msg: 'Ceci est une propriété requise' }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',');
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if (!value) {
                        throw new Error('Un pokemon doit avoir au moins un type')
                    }
                    if (value.split(',').length > 3) {
                        throw new Error('Un pokemon de peut pas avoir plus de trois types')
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {
                            //alert('kk')
                        }
                    });
                }
            }
        },
    }, {
        timetamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}