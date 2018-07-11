const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Chat Box';



app.get('/', (request, response) => {
  response.send('Oh hey Chat Box');
});

app.get('/api/v1/companies', (request, response) => {
  database('companies')
    .select()
    .then((companies) => {
      response.status(200).json(companies);
    })
    .catch((error) => {
      response.status(500).json({
        error
      });
    });
});

app.get('/api/v1/companies/:id/questions', (request, response) => {
  const { id } = request.params

  database('questions').where("company_id", id)
    .select()
    .then(questions => {
      if (!questions.length) {
        return response.status(404).json({
          error: 'Sorry, no questions could be found'
        })
      }
      response.status(200).json(questions)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/questions', (request, response) => {
  database('questions')
    .select()
    .then((questions) => {
      response.status(200).json(questions);
    })
    .catch((error) => {
      response.status(500).json({
        error
      });
    });
});

app.get('/api/v1/questions/:id', (request, response) => {
  database('questions')
    .select()
    .then((questions) => {
      response.status(200).json(questions);
    })
    .catch((error) => {
      response.status(500).json({
        error
      });
    });
});

app.post('/api/v1/companies', (request, response) => {
  const {
    company
  } = request.body
  database('companies').insert(company, 'id')
    .then((companyId) => {
      response.status(201).json({
        companyId: companyId[0]
      });
    })
    .catch((error) => {
      response.status(500).json({
        error
      });
    });
});

app.post('/api/v1/questions', (request, response) => {
  const {
    question
  } = request.body
  database('questions').insert(question, 'id')
    .then((questionId) => {
      response.status(201).json({
        questionId: questionId[0]
      });
    })
    .catch((error) => {
      response.status(500).json({
        error
      });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});