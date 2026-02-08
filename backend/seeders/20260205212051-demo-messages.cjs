'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const existingMessages = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM messages',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (existingMessages[0].count > 0) {
      console.log('Seeder: Wiadomości już istnieją, pomijam.');
      return;
    }

    await queryInterface.sequelize.query('ALTER TABLE messages AUTO_INCREMENT = 1');

    await queryInterface.bulkInsert('messages', [
      {
        content: 'To jest pierwsza przykładowa wiadomość.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'To jest druga przykładowa wiadomość.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'To jest trzecia przykładowa wiadomość.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};