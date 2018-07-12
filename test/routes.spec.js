process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const database = require('../db/knex');

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

  beforeEach(done => {
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

  describe('POST /api/v1/companies', () => {
    it.only('should add a company to the database', done => {
      chai.request(server)
        .post('/api/v1/companies')
        .send({
          name: 'Company Scmopany'
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('companyId');
          response.body.companyId.should.equal(2);
          done();
        })
    })

    it('should not add a project if the correct params were not sent', done => {
      chai.request(server)
        .post('/api/v1/projects')
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal('Expected format: { name: <String> }. You\'re missing a name property.')
          done();
        })
    })
  })

  describe('POST /api/v1/palettes', () => {
    it('should add a palette to the database', done => {
      chai.request(server)
        .post('/api/v1/projects/1/palettes')
        .send({
          name: 'palette schmalette',
          project_id: '1',
          color1: 'red',
          color2: 'green',
          color3: 'blue',
          color4: 'yellow',
          color5: 'marigold'
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('palette_id');
          response.body.palette_id.should.equal(3);
          done();
        })
    })

    it('should not add a palette if any params are missing', done => {
      chai.request(server)
        .post('/api/v1/projects/1/palettes')
        .send({
          project_id: '1',
          color1: 'red',
          color2: 'green',
          color3: 'blue',
          color4: 'yellow',
          color5: 'marigold'
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal('Expected format: { name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String> }. You\'re missing a name property')
          done();
        })
    })

    it('should not add a palette if the project was not found', done => {
      chai.request(server)
        .post('/api/v1/projects/111/palettes')
        .send({
          name: 'pal',
          project_id: '1',
          color1: 'red',
          color2: 'green',
          color3: 'blue',
          color4: 'yellow',
          color5: 'marigold'
        })
        .end((err, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('Could not find project with id 111.')
          done();
        })
    })
  })

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should delete a palette from the database', done => {
      chai.request(server)
        .delete('/api/v1/palettes/1')
        .end((err, response) => {
          response.should.have.status(200);
          chai.request(server)
            .get('/api/v1/palettes/1')
            .end((err, response) => {
              response.should.have.status(404);
              response.body.error.should.equal('Could not find palette with id 1.');
              done();
            })
        })
    })

    it('should send a 404 if the project was not found', done => {
      chai.request(server)
        .delete('/api/v1/palettes/81')
        .end((err, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('Could not find palette with id 81.');
          done();
        })
    })

  })


})
