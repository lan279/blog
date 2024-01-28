
'use strict';


// User.findByPk(id).then(user=>{ //做事 })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true,
			defaultValue: 'image/user.png',
    });

    await queryInterface.addColumn('Users', 'bg', {
      type: Sequelize.STRING,
      allowNull: true,
			defaultValue: 'image/bg.jpg',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'avatar');
    await queryInterface.removeColumn('Users', 'bg');
  }
};

