exports.seed = function(knex, Promise) {
  return knex('questions').del()
    .then(() => knex('companies').del())
    .then(() => {
      return Promise.all([
        knex('companies').insert({ name: 'Turing' }, 'id')
        .then(company => {
          return knex('questions').insert([
            { question: 'What is your favorite color?',
              position: 'Sr. Developer', 
              date: 'May 24, 1991',
              company_id: company[0] 
            },
            { question: 'What is your favorite animal?',
              position: 'Jr. Developer', 
              date: 'June 24, 1991',
              company_id: company[0] 
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${ error }`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${ error }`))
};
