const sequelize = require("../config/database")

const {DataTypes } = require("sequelize")

const Veiculo = sequelize.define('Veiculo',{
    placa:{
        type:DataTypes.STRING,
        alloNull: false
    },
    modelo:{
        type:DataTypes.STRING,
        alloNull: false
    },
    ano:{
        type:DataTypes.INTEGER,
        validate:{
            min:1901,
            max:2155
        },
        alloNull: false
    },
    cor:{
        type:DataTypes.STRING,
        alloNull: false
    },
    preco:{
        type:DataTypes.DECIMAL(10,2),
        alloNull: false
    },
    linkImagem:{
        type:DataTypes.STRING,
        alloNull: false
    }
})

module.exports = Veiculo;