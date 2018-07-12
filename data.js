/* eslint-disable */

const questions = [{
    company: 'Microsoft',
    date: 'Aug 16, 2012',
    position: 'Software Development Engineer In Test (SDET)',
    question: 'How many gas stations are there in California?'
  },
  {
    company: 'Raytheon',
    date: 'Jan 3, 2013',
    position: 'Senior Software Engineer',
    question: 'Discuss a situation in which you missed a deadline and how you handled it.'
  },
  {
    company: 'ProKarma',
    date: 'Apr 7, 2012',
    position: 'Software Engineer',
    question: 'They asked me to provide the current client list for my company and their clients contact details.'
  },
  {
    company: 'ProKarma',
    date: 'Apr 7, 2012',
    position: 'Software Engineer',
    question: 'Question related to hibernate data caching'
  },
  {
    company: 'Return Path',
    date: 'Feb 1, 2015',
    position: 'Software Engineer',
    question: 'I\'m going to give you a series of pairs of words. You tell me which resonates with you more and why.'
  },
  {
    company: 'Swiftpage',
    date: 'Nov 4, 2013',
    position: 'Software Engineer',
    question: 'When I asked them "where do you see this position leading in 5 years" they immediately turned the question around and asked "where do you see yourself taking this position in 5 years?"'
  },
  {
    company: 'Sungard Availability Services',
    date: 'Jul 1, 2015',
    position: 'Senior Software Engineer',
    question: 'Please explain the process of forming a TCP/IP connection.'
  },
  {
    company: 'Staples',
    date: 'Apr 13, 2014',
    position: 'Principal Software Engineer',
    question: '"Can you just sign here, please?"'
  },
  {
    company: 'Sogeti',
    date: 'Dec 8, 2013',
    position: 'Senior Software Engineer',
    question: 'We are looking for long term players, not just a temp job for now.'
  },
  {
    company: 'Ping Identity',
    date: 'Feb 24, 2014',
    position: 'Senior Software Engineer',
    question: 'Programming assignment was unexpected.'
  },
  {
    company: 'MapQuest',
    date: 'Mar 31, 2015',
    position: 'Senior Software Engineer',
    question: 'Diagram a classic example of a factory and inheritance. Diagram an example of a factory and inheritance in Javascript. Explain the differences.'
  },
  {
    company: 'Comcast',
    date: 'Jan 30, 2014',
    position: 'Senior Software Engineer',
    question: 'I cannot recall a specific question that stood out as being "most difficult or unexpected", but almost all of the questions could be gleanedfrom The Java Programming Language or the Java Standard Edition API documentation, for example: "describe the java.util.Arrays class".'
  },
  {
    company: 'CSG',
    date: 'May 30, 2013',
    position: 'Software Quality Assurance Engineer',
    question: 'Wanted to know what I had studied in college as a BS Computer Information systems major. Inquired extensively about my experience and skillswith my internship job at a major telecom company.'
  },
  {
    company: 'Comcast',
    date: 'Jul 3, 2015',
    position: 'Senior Software Engineer',
    question: 'questions about design patterns I\'ve used, difference between TCP and UDP, how to communicate between a producer and a consumer thread, howto instantiate threads, how to do a Singleton pattern. How to handle difficult situation with co-worker.'
  },
  {
    company: 'SpotX',
    date: 'Dec 29, 2013',
    position: 'Software Engineer',
    question: 'Depending on who you might get, prepare to get into the nitty gritty on any number of topics from high level OO concepts to language specific "what would happen here" tests to "implement this concept" pseudocode exercises. Candidates should be lucid about the nuts and bolts of projects they\'ve worked on.'
  },
  {
    company: 'Oracle',
    date: 'Aug 27, 2013',
    position: 'Senior Software Engineer',
    question: 'Here\'s an obscure piece of code. What will be printed at line 27? (actually, I got this question several times, but thankfully they didn\'tuse messed-up variable names). They also asked about infrequently used language features: "Transient", "Volatile", "Finalize", etc.'
  },
  {
    company: 'Alchemy Security',
    date: 'May 9, 2012',
    position: 'QA Software Engineer',
    question: 'What is the nature of the studies you have been pursuing at CU.'
  },
  {
    company: 'Polycom',
    date: 'Apr 20, 2018',
    position: 'Sr. Software Engineer',
    question: 'This question was asked back in 2012 so they haven\'t changed their interview in 6 years! What is the value of b at the end of the program? int b=1; While(a > 0){ a &= b; b++; } return b;'
  },
  {
    company: 'Polycom',
    date: 'Apr 20, 2018',
    position: 'Sr. Software Engineer',
    question: 'Taking a set of N numbers starting at 1. How many algorithms can you think of to remove a duplicate if there is 1 duplicate? Ex {1,2,5,4,3,5} Then for each solution determine the Big O notation for Memory and for CPU and then compare.'
  },
  {
    company: 'Raytheon',
    date: 'Jan 26, 2013',
    position: 'Software Engineer',
    question: 'Explain polymorphism, inheritance, etc...'
  },
  {
    company: 'MapQuest',
    date: 'Sep 14, 2012',
    position: 'Senior Software Engineer',
    question: 'Explain the reasoning behind the OO practice of favoring composition over inheritance. When would you use one or the other?'
  },
  {
    company: 'Jeppesen',
    date: 'Sep 28, 2012',
    position: 'Software Engineer Intern',
    question: 'You have detected a memory leak. What steps would you take to isolate it?'
  },
  {
    company: 'Aerotek',
    date: 'Feb 6, 2013',
    position: 'Software Engineer',
    question: 'Have you ever used tool \'X\'?'
  },
  {
    company: 'SpotX',
    date: 'Feb 21, 2015',
    position: 'Software Engineer',
    question: 'Should have at least asked: "Would you like a glass of water or something?"'
  },
  {
    company: 'Trustwave',
    date: 'Jan 4, 2013',
    position: 'Software Engineer',
    question: 'The programming problem was difficult because you must show programming prowess without overengineering the problem because it is simple, ohyeah it has to work too.'
  },
  {
    company: 'Brooksource',
    date: 'Apr 16, 2012',
    position: 'Software Engineer',
    question: 'I was asked logical questions I knew how to answer. Simple questions about technologies.'
  },
  {
    company: 'ClickFox',
    date: 'Jun 25, 2012',
    position: 'Software Engineer',
    question: 'Flex/ActionScript code specific questions'
  },
  {
    company: 'eCollege.com',
    date: 'Apr 23, 2012',
    position: 'Software Quality Engineer',
    question: 'Do you have any experience with Selenium or other open source tools'
  },
  {
    company: 'ClickFox',
    date: 'Jun 25, 2012',
    position: 'Software Engineer',
    question: 'TTD question'
  },
  {
    company: 'Lockheed Martin',
    date: 'Aug 16, 2010',
    position: 'Software Engineer',
    question: 'In Java 1.6, what is autoboxing? When does it occur?'
  },
  {
    company: 'Jeppesen',
    date: 'Sep 20, 2012',
    position: 'Software Engineer',
    question: 'Write a complex SQL query from memory to perform a specific task'
  },
  {
    company: 'Lockheed Martin',
    date: 'Aug 16, 2010',
    position: 'Software Engineer',
    question: 'When have you dealt with frustration at work? How did you deal with it?'
  },
  {
    company: 'Recondo Technology',
    date: 'Dec 15, 2010',
    position: 'Software Engineer',
    question: 'How can you ensure that something you pull out of a collection is the right type?'
  },
  {
    company: 'Recondo Technology',
    date: 'Dec 15, 2010',
    position: 'Software Engineer',
    question: 'How would you make a method thread-safe in Java?'
  },
  {
    company: 'Staples',
    date: 'Jun 10, 2015',
    position: 'Principal Software Engineer',
    question: 'Have you ever had any issues with Sterling pipelines setup?'
  },
  {
    company: 'Revature',
    date: 'Jan 19, 2018',
    position: 'Software Engineer',
    question: 'Do you have experience with Java?'
  },
  {
    company: 'DISH',
    date: 'Feb 6, 2018',
    position: 'Software Engineer - Java',
    question: 'Joins in MySQL, oops concepts, Interface vs Abstract, basics of spring & hibernate questions. Print even and odd numbers using ArrayList.'
  },
  {
    company: 'EcoStar',
    date: 'Sep 8, 2015',
    position: 'Software Engineer',
    question: 'How do you think about team work?'
  },
  {
    company: 'TrainerRoad',
    date: 'May 18, 2017',
    position: 'Senior Software Engineer',
    question: 'What is your salary expectations: From the Stack Overflow form, you are supposed to say $100k.'
  },
  {
    company: 'Sierra Nevada Corporation',
    date: 'Jun 12, 2016',
    position: 'Software Engineering',
    question: 'Nothing technical, just to talk about projects I had done in school and my proficiency with different languages.'
  },
  {
    company: 'Lockheed Martin',
    date: 'Mar 29, 2016',
    position: 'Software Engineer',
    question: 'They mostly just asked questions about teamwork. Tell us about a time you worked on a team and there were difficulties with one of the team members. Stuff like that. There were no technical questions involving pseudo code or anything like that'
  },
  {
    company: 'Vertafore',
    date: 'Jan 22, 2018',
    position: 'Software Engineer I',
    question: 'Asked me how I would write a basic declaration in Java. All the other questions were very background oriented.'
  },
  {
    company: 'Jeppesen',
    date: 'Mar 14, 2016',
    position: 'Software Engineer IV',
    question: 'EJB questions'
  },
  {
    company: 'Vertafore',
    date: 'Sep 19, 2017',
    position: 'Software Engineer-I',
    question: 'Can you give that assessment test again in 15 minutes instead of 45 minutes?'
  },
  {
    company: 'MapQuest',
    date: 'Jul 14, 2017',
    position: 'Senior Software Engineer',
    question: 'Write a diagram of a model, architecture of the Stack you working on? here is the problem, give me solutions how to approach and why. All White boarding of course'
  },
  {
    company: 'SnapLogic',
    date: 'May 21, 2016',
    position: 'Senior Software Engineer',
    question: 'Look for errors in a code sample.'
  },
  {
    company: 'Rally Software',
    date: 'Sep 13, 2015',
    position: 'Software Engineer',
    question: 'Why did you apply to work here?'
  },
  {
    company: 'Apigee',
    date: 'May 21, 2016',
    position: 'Principal Software Engineer',
    question: 'Print unique strings in a array.'
  },
  {
    company: 'Lockheed Martin',
    date: 'Oct 6, 2017',
    position: 'Software Engineer',
    question: 'You are given both the top right and bottom left points of two squares. Write a function that returns the area in which the two squares overlap. If they don\'t overlap, simply return false'
  },
  {
    company: 'Lockheed Martin',
    date: 'Oct 14, 2015',
    position: 'Software Engineer',
    question: 'What is polymorphism?'
  }
];

const getCompanies = (questions) => {
  return questions.reduce((companiesObj, question) => {
    if (!companiesObj[question.company]) {
      companiesObj[question.company] = {
        name: question.company,
        questions: []
      };
    } 

    companiesObj[question.company].questions.push(question);

    return companiesObj;
  }, {})
}

const companies = getCompanies(questions);

module.exports = {
  questions, 
  companies
}


