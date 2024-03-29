const {Sequelize} = require('sequelize')
const sequelize = require('../util/database')

const Post = sequelize.define('Post',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    content:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

module.exports = Post