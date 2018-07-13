[![Build Status](https://travis-ci.org/daughedm/BYOB.svg?branch=master)](https://travis-ci.org/daughedm/BYOB)

# BYOB

## Synopsis

Build Your Own Backend is an API that provides software engineer interview question data from Glassdoor. Using the API endpoints, a user can access the data and an authorized user can write data with a valid token.

## Motivation

Glassdoor provides great information about interviews, but we wanted a way to quickly get just interview questions to use to study for coding interviews. 

## Installation

To get started, clone down this repo and run `npm install` 

Install the dependencies: 
* body-parser
* dotenv
* express
* jsonwebtoken
* knex
* nightmare
* pg

Run the server with `node server.js`

## API Reference

### Authorization
To request admin access, visit [interview-questions-database.herokuapp.com] and enter a valid email address and app name.

All write enpoints require a token to be sent as the authorization header: 
`Authorization: Bearer [your-token]`

### Endpoints:
* `GET /companies`

Receive a json object of all companies. 
Sample Response:
```
[
    {
        "id": 1,
        "name": "Microsoft",
        "totalQuestions": 1,
        "created_at": "2018-07-12T00:49:55.699Z",
        "updated_at": "2018-07-12T00:49:55.699Z"
    },
    {
        "id": 2,
        "name": "Raytheon",
        "totalQuestions": 2,
        "created_at": "2018-07-12T00:49:55.706Z",
        "updated_at": "2018-07-12T00:49:55.706Z"
    },
    ...
]
```

* `GET /companies/:id`

Receive a json object of a specific company.
Request requirements: Send the company id in the url.
Optional query parameters: Add `?company=[companyName]` to the url to receive a json object of all questions for a specific company.
Sample Response:
```
{
    "id": 1,
    "name": "Microsoft",
    "totalQuestions": 1,
    "created_at": "2018-07-12T00:49:55.699Z",
    "updated_at": "2018-07-12T00:49:55.699Z"
}
```

* `GET /questions`

Receive a json object of all questions.
Sample Response:
```
[
    {
        "id": 4,
        "question": "They asked me to provide the current client list for my company and their clients contact details.",
        "position": "Software Engineer",
        "date": "Apr 7, 2012",
        "company_id": 3,
        "created_at": "2018-07-12T00:49:55.733Z",
        "updated_at": "2018-07-12T00:49:55.733Z"
    },
    {
        "id": 5,
        "question": "Question related to hibernate data caching",
        "position": "Software Engineer",
        "date": "Apr 7, 2012",
        "company_id": 3,
        "created_at": "2018-07-12T00:49:55.734Z",
        "updated_at": "2018-07-12T00:49:55.734Z"
    },
    ...
]
```

* `GET /questions/:id`

Receive a json object of a specific question.
Request requirements: Send the question id in the url.
Sample Response:
```
{
    "id": 4,
    "question": "They asked me to provide the current client list for my company and their clients contact details.",
    "position": "Software Engineer",
    "date": "Apr 7, 2012",
    "company_id": 3,
    "created_at": "2018-07-12T00:49:55.733Z",
    "updated_at": "2018-07-12T00:49:55.733Z"
}
```

* `POST /companies`

Add a new company.
Request requirements: 
Header: Must send your authorization token in the header. See Authorization section for more info. 
Body: Must send a company name in the body as `{ name: [company-name] }`

* `POST /questions`

Add a new question.
Request requirements: 
Header: Must send your authorization token in the header. See Authorization section for more info. 
Body: Must send all question info - `question`, `position`, `date`, `company`

* `PUT /companies/:id`

Update an existing company.
Request requirements:
Header: Must send your authorization token in the header. See Authorization section for more info. 
Body: Must send a company name in the body as `{ name: [company-name] }`

* `PUT /questions/:id`

Update an existing question.
Request requirements: 
Header: Must send your authorization token in the header. See Authorization section for more info. 
Body: Send the question info you are updating  - `question`, `position`, `date`, `company`

* `DELETE /companies/:id`

Delete a company.
Request requirements: 
Header: Must send your authorization token in the header. See Authorization section for more info. 
Url: Send the company id in the url.

* `DELETE /questions/:id`

Delete a question.
Request requirements: 
Header: Must send your authorization token in the header. See Authorization section for more info. 
Url: Send the question id in the url.


## Contributors

[David Daugherty](https://github.com/daughedm) & [Daniela Carey](https://github.com/danielafcarey)

(**[Turing School of Software & Design Front-end Engineering project spec](http://frontend.turing.io/projects/build-your-own-backend.html) - Mod 4**)


