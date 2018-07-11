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

const checkCompanyParams = (request, response, next) => {
  if(!request.body.name) {
    response.status(422).send('Missing a name in the body of your request.')
  } else {
    next();
  }
}

const checkQuestionParams = (request, response, next) => {
  // if (!request.body.name) {
  //   response.status(422).send('Missing a name in the body of your request.')
  // } 
    next();
  
}


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
const { id } = request.params

  database('questions').where("id", id)
    .select()
    .then(question => {
      if (!question) {
        return response.status(404).json({
          error: 'Sorry, question could not be found'
        })
      } else {
      response.status(200).json(question[0])
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})


//posts
app.post('/api/v1/companies', checkCompanyParams, (request, response) => {
  const { name } = request.body
  database('companies').insert({ name, totalQuestions: 0 }, 'id')
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

app.post('/api/v1/questions', checkQuestionParams, (request, response) => {
  const { question, date, position, company } = request.body
  
  database('companies').where("name", company)
  .select()
  .then((companyObj) => {
    const newQuestion = {
      question,
      date,
      position,
      company_id: companyObj[0].id
    }
    database('questions').insert(newQuestion, 'id')
      .then((questionId) => {
        response.status(201).json({
          questionId: questionId[0]
        });
      })
      .catch((error) => {
        response.status(500).json({
          error
        });
      })
    })
});


//puts
app.put('/api/v1/questions/:id', checkQuestionParams, (request, response) => {

})

app.put('/api/v1/companies/:id', checkCompanyParams, (request, response) => {

})

//delete
app.delete('/api/v1/questions/:id', (request, response) => {

})

app.delete('/api/v1/companies/:id', (request, response) => {

})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});