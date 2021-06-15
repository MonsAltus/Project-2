const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cart extends Model {}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Product_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        Product_Name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        Price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'id'
            }
            
        }
    },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Cart'
    }
);

module.exports = Cart;