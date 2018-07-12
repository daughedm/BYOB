process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const database = require('../db/knex');
const jwt = require('jsonwebtoken');
require('dotenv').config();

chai.use(chaiHttp);

describe('client routes', () => {
  it('should receive a response of index.html when we hit the root endpoint', done => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      })
  })

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/interviews-are-fun')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      })
  })
})

describe('api routes', () => {
  let token;

  beforeEach(done => {
    token = jwt.sign(
      { email: 'test@turing.io', appName: 'test' }, 
      process.env.SECRET_KEY,
      { expiresIn: '48h' } 
    );

    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => {
            return database.seed.run()
              .then(() => {
                done();
              })
          })
      })
  })

  afterEach(done => {
    database.migrate.rollback()
      .then(() => {
        done();
      })
  })

  describe('GET /api/v1/companies', () => {
    it('should return an array of companies', done => {
      chai.request(server)
        .get('/api/v1/companies')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Turing');
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          done();
        })
    })

  })

  describe('GET /api/v1/companies/:id', () => {
    it('should return a specific company', done => {
      chai.request(server)
        .get('/api/v1/companies/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('name');
          response.body.name.should.equal('Turing');
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          done();
        })
    })

    it('should return a 404 if the project was not found', done => {
      chai.request(server)
        .get('/api/v1/companies/3')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    })
  })

  describe('GET /api/v1/questions', () => {
    it('should return an array of questions', done => {
      chai.request(server)
        .get('/api/v1/questions')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('question');
          response.body[0].question.should.equal('What is your favorite color?');
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('date');
          response.body[0].date.should.equal('May 24, 1991');
          response.body[0].should.have.property('position');
          response.body[0].position.should.equal('Sr. Developer');
          done();
        })
    })

    it('should return an array of questions for a specific company query', done => {
       chai.request(server)
        .get('/api/v1/questions?company=Turing')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('question');
          response.body[0].question.should.equal('What is your favorite color?');
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('date');
          response.body[0].date.should.equal('May 24, 1991');
          response.body[0].should.have.property('position');
          response.body[0].position.should.equal('Sr. Developer');
          response.body[1].should.have.property('question');
          response.body[1].question.should.equal('What is your favorite animal?');
          response.body[1].should.have.property('id');
          response.body[1].id.should.equal(2);
          response.body[1].should.have.property('date');
          response.body[1].date.should.equal('June 24, 1991');
          response.body[1].should.have.property('position');
          response.body[1].position.should.equal('Jr. Developer');
          done();
        })
 
    })

    it('should return a 404 error if a company is sent in the query that does not exist', done => {
      chai.request(server)
        .get('/api/v1/questions?company=dingus')
        .end((error, response) => {
          response.should.have.status(404);
          response.text.should.equal('Company not found.')
          done();
        })
    })

  })

  describe('GET /api/v1/questions/:id', () => {
    it('should return a question object', done => {
      chai.request(server)
        .get('/api/v1/questions/1')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('question');
          response.body.question.should.equal('What is your favorite color?');
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          response.body.should.have.property('date');
          response.body.date.should.equal('May 24, 1991');
          response.body.should.have.property('position');
          response.body.position.should.equal('Sr. Developer');
          done(); 
        })
    })

    it('should return a 404 if no question was found', done => {
      chai.request(server)
        .get('/api/v1/questions/100')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    })

  })

  describe('POST /api/v1/authenticate', () => {
    it('should return a jwt', done => {
      chai.request(server)
        .post('/api/v1/authenticate')
        .send({ email: 'test@turing.io', appName: 'test' }) 
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('string');
          done();
        })
    })

    it('should return an error if parameters are missing', done => {
      chai.request(server)
        .post('/api/v1/authenticate')
        .send({ appName: 'test' }) 
        .end((err, response) => {
          response.should.have.status(422);
          response.text.should.be.equal('You are missing email in the body of your request.');
          done();
        })

    })
  })

  describe('POST /api/v1/companies', () => {
    it('should add a company to the database', done => {
      chai.request(server)
        .post('/api/v1/companies')
        .set('authorization', 'Bearer ' + token)
        .send({ name: 'Company Scmopany' })
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('companyId');
          response.body.companyId.should.equal(2);
          done();
        })
    })

    it('should not add a company if the correct params were not sent', done => {
      chai.request(server)
        .post('/api/v1/companies')
        .set('authorization', 'Bearer ' + token)
        .send({ notAValidParam: 'Company Scmopany' })
        .end((err, response) => {
          response.should.have.status(422);
          response.text.should.equal('Missing a name in the body of your request.')
          done();
        })
    })
  })

  describe('POST /api/v1/questions', () => {
    it('should add a question to the database', done => {
      chai.request(server)
        .post('/api/v1/questions')
        .set('authorization', 'Bearer ' + token)
        .send({
          question: 'What am I doing with my life?',
          position: 'janitor',
          date: 'yesterday',
          company: 'Turing'
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('questionId');
          response.body.questionId.should.equal(3);
          done();
        })
    })

    it('should not add a question if any params are missing', done => {
      chai.request(server)
        .post('/api/v1/questions')
        .set('authorization', 'Bearer ' + token)
        .send({
          position: 'janitor',
          date: 'yesterday',
          company: 'Turing'
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.text.should.equal('Missing content in the body of your request.')
          done();
        })
    })

  })

  describe('PUT /api/v1/questions/:id', () => {
    it('should update the question with the new info', done => {
      chai.request(server)
        .put('/api/v1/questions/1')
        .set('authorization', 'Bearer ' + token)
        .send({
          question: 'What am I doing with my life?',
          position: 'doctor',
          date: 'yesterday',
          company: 'Turing'
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.text.should.equal('Updated 1 question.');
          done();
        })
    })

    it('should send an error if the question id is not found', done => {
      chai.request(server)
        .put('/api/v1/questions/1111')
        .set('authorization', 'Bearer ' + token)
        .send({
          question: 'What am I doing with my life?',
          position: 'doctor',
          date: 'yesterday',
          company: 'Turing'
        })
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.error.should.equal('Sorry, question could not be found');
          done();
        })
    })

    it('should send a 422 error if a parameter is missing', done => {
      chai.request(server)
        .put('/api/v1/questions/1')
        .set('authorization', 'Bearer ' + token)
        .send({
          position: 'doctor',
          date: 'yesterday',
          company: 'Turing'
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.text.should.equal('Missing content in the body of your request.');
          done();
        })
    })
  })

  describe('PUT /api/v1/companies/:id', () => {
    it('should update the company with the new info', done => {
      chai.request(server)
        .put('/api/v1/companies/1')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'Galvanize'
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.text.should.equal('Updated 1 company.');
          done();
        })

    })

    it('should send an error if the company id is not found', done => {
      chai.request(server)
        .put('/api/v1/companies/1111')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'Galvanize'
        })
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.error.should.equal('Sorry, company could not be found');
          done();
        })

    })

    it('should send a 422 error if a parameter is missing', done => {
      chai.request(server)
        .put('/api/v1/companies/1')
        .set('authorization', 'Bearer ' + token)
        .send({
          fakeName: 'DocsPary'
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.text.should.equal('Missing a name in the body of your request.');
          done();
        })
    })
  })

  describe('DELETE /api/v1/companies/:id', () => {
    it('should delete a company from the database', done => {
      chai.request(server)
        .delete('/api/v1/companies/1')
        .set('authorization', 'Bearer ' + token)
        .end((err, response) => {
          response.should.have.status(204);
          done();
        })
    })
  })

  describe('DELETE /api/v1/questions/:id', () => {
    it('should delete a question from the database', done => {
      chai.request(server)
        .delete('/api/v1/questions/1')
        .set('authorization', 'Bearer ' + token)
        .end((err, response) => {
          response.should.have.status(204);
          done();
        })
    })
  })

})
