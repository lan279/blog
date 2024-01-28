

const {Sequelize} = require('sequelize')
const sequelize = require('../util/database')


// create
const User = sequelize.define('User',{
   id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
   },
   username:{
      type:Sequelize.STRING,
      allowNull:false
   },
   password:{
      type:Sequelize.STRING,
      allowNull:false
   },
   avatar:{
      type:Sequelize.STRING,
      allowNull:true,
      defaultValue: 'image/user.png'
   },
   bg:{
      type:Sequelize.STRING,
      allowNull:true,
      defaultValue :'image/bg.jpg'
   },
})

// User.create()


module.exports = User