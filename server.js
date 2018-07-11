const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Company Interview Questions';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


//gets
app.get('/', (request, response) => {
  response.send('Welcome to Company Interview Questions');
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

app.get('/api/v1/companies/:id', (request, response) => {
  const { id } = request.params

  database('companies').where("id", id)
    .select()
    .then(company => {
      if (!company) {
        return response.status(404).json({
          error: 'Sorry, company could not be found'
        })
      } else {
      response.status(200).json(company[0])
      }
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


//posts
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


//puts
app.put('/api/v1/questions/:id', (request, response) => {

})

app.put('/api/v1/companies/:id', (request, response) => {

})

//delete
app.delete('/api/v1/questions/:id', (request, response) => {

})

app.delete('/api/v1/companies/:id', (request, response) => {

})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});