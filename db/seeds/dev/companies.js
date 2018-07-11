exports.seed = function (knex, Promise) {
  return knex('questions').del()
    .then(() => knex('companies').del())
    .then(() => {
      return Promise.all([
        knex('companies').insert({
          name: 'Cool Thing',
          totalQuestions: 2
        }, 'id')
        .then(company => {
          return knex('questions').insert([{
            question: 'What would you rather fight, 1000 duck size horses or one horse sized duck?',
            position: 'Developer',
            date: 'June 21 2018',
            company_id: company[0]
          },
          {
            question: 'What would you rather fight, 1000 duck size horses or one horse sized duck?',
            position: 'Developer',
            date: 'June 21 2018',
            company_id: company[0]
          }
        ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
