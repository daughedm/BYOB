const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./db/knex');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Company Interview Questions';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const checkCompanyParams = (request, response, next) => {
  if (!request.body.name) {
    response.status(422).send('Missing a name in the body of your request.');
  } else {
    next();
  }
};

const checkQuestionParams = (request, response, next) => {
  const {question, company, date, position} = request.body;
  if (!question || !company || !date || !position) {
    response.status(422).send('Missing content in the body of your request.');
  } else {
    next();
  }
};

const checkQuestionId = (request, response, next) => {
  database('questions').where('id', request.params.id)
    .select()
    .then(question => {
      if (!question.length) {
        return response.status(404).json({
          error: 'Sorry, question could not be found'
        });
      } else {
        next();
      }
    });
};

const checkCompanyId = (request, response, next) => {
  database('companies').where('id', request.params.id)
    .select()
    .then(company => {
      if (!company.length) {
        return response.status(404).json({
          error: 'Sorry, company could not be found'
        });
      } else {
        next();
      }
    });
};

const checkAuth = (request, response, next) => {
  const { authorization } = request.headers;
  const token = authorization.split('Bearer ')[1];

  if (!token) {
    return response.status(403).send('You must be authorized to hit this endpoint.');
  } else {
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY);

      next();
    } catch (error) {
      return response.status(403).send(error.message);
    }
  }
};

const verifyEmail = (request, response, next) => {
  const { authorization } = request.headers;
  const token = authorization.split('Bearer ')[1];
  const decoded = jwt.decode(token, {complete: true});
  const { email } = decoded.payload;
  const emailEnd = email.split('@')[1];

  if (emailEnd !== 'turing.io') {
    return response.status(403).send('You must have a valid admin email.');
  } else {
    next();
  }
};

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
  const { id } = request.params;

  database('companies').where("id", id)
    .select()
    .then(company => {
      if (!company.length) {
        return response.status(404).json({
          error: 'Sorry, company could not be found'
        });
      } else {
        response.status(200).json(company[0]);
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/questions', (request, response) => {
  const companyQuery = request.query.company;
  if (!companyQuery) {
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
  } else {
    database('companies')
      .where('name', companyQuery)
      .select()
      .then(company => {
        if (!company.length) {
          return response.status(404).send('Company not found.');
        } else {
          database('questions')
            .where('company_id', company[0].id)
            .select()
            .then(questions => {
              return response.status(200).json(questions);
            });
        }
      })
      .catch((error) => {
        response.status(500).json({
          error
        });
      });
  }
});

app.get('/api/v1/questions/:id', (request, response) => {
  const { id } = request.params;

  database('questions').where("id", id)
    .select()
    .then(question => {
      if (!question.length) {
        return response.status(404).json({
          error: 'Sorry, question could not be found'
        });
      } else {
        response.status(200).json(question[0]);
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});


//posts
app.post('/api/v1/authenticate', (request, response) => {
  const { email, appName } = request.body;
  const payload = { email, appName };
  const requiredParams = ['email', 'appName'];
  const missingParams = [];

  requiredParams.forEach(param => {
    if (!payload[param]) {
      missingParams.push(param);
    }
  });

  if (missingParams.length) {
    return response.status(422).send(`You are missing ${missingParams.join(', ')} in the body of your request.`);
  } else {
    const token = jwt.sign(
      payload, 
      process.env.SECRET_KEY,
      { expiresIn: '48h' } 
    );
    return response.status(200).json({ token });
  }
});


app.post('/api/v1/companies', checkAuth, verifyEmail, checkCompanyParams, (request, response) => {
  const { name } = request.body;
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

app.post('/api/v1/questions', checkAuth, verifyEmail, checkQuestionParams, (request, response) => {
  const { question, date, position, company } = request.body;
  
  database('companies').where("name", company)
    .select()
    .then((companyObj) => {
      const newQuestion = {
        question,
        date,
        position,
        company_id: companyObj[0].id
      };
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
        });
    });
});


// puts
app.put('/api/v1/questions/:id', checkAuth, verifyEmail, checkQuestionParams, checkQuestionId, (request, response) => {
  const { id } = request.params;
  const { question, position, date } = request.body;
  database('questions').where("id", id)
    .update({
      question,
      position,
      date
    })
    .then(updatedQuestion => {
      response.status(200).send(`Updated ${updatedQuestion} question.`);
    })
    .catch(error => response.status(400).send(error));
});

app.put('/api/v1/companies/:id', checkAuth, verifyEmail, checkCompanyParams, checkCompanyId, (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  database('companies').where("id", id)
    .update({
      name
    })
    .then(updatedCompany => {
      response.status(200).send(`Updated ${updatedCompany} company.`);
    })
    .catch(error => response.status(400).send(error));
});


//delete
app.delete('/api/v1/companies/:id', checkAuth, verifyEmail, (request, response) => {
  const { id } = request.params;

  database('questions').where('company_id', id).del()
    .then(questions => {
      database('companies').where('id', id).del()
        .then(companies => response.sendStatus(204))
        .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/questions/:id', checkAuth, verifyEmail, (request, response) => {
  const { id } = request.params;

  database('questions').where('id', id).del()
    .then(questions => response.sendStatus(204))
    .catch(error => response.status(500).json({
      error
    }));
});


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
