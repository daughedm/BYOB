const {
  companies
} = require('../../../data');

const createCompany = (knex, company) => {
  return knex('companies').insert({
      name: company.name,
      totalQuestions: company.questions.length
    }, 'id')
    .then(companyId => {
      let questionPromises = [];

      company.questions.forEach(questionObj => {
        let {
          question,
          date,
          position
        } = questionObj;
        questionPromises.push(
          createQuestion(knex, {
            question,
            position,
            date,
            company_id: companyId[0]
          })
        )
      });
      return Promise.all(questionPromises);
    })
}

const createQuestion = (knex, question) => {
  return knex('questions').insert(question)
}



exports.seed = function (knex, Promise) {
  return knex('questions').del()
    .then(() => knex('companies').del())
    .then(() => {
      let companyPromises = [];
      const companyKeys = Object.keys(companies)
      
      companyKeys.forEach(key => {
        companyPromises.push(createCompany(knex, companies[key]))
      })
      return Promise.all(companyPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};