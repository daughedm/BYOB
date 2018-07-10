var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true
});

nightmare
  .goto('https://www.glassdoor.com/Interview/denver-software-engineer-interview-questions-SRCH_IL.0,6_IM234_KO7,24_IP2.htm')
  .wait(2000)
  .evaluate(function () {
    var questionNodes = document.querySelectorAll('p.h3.questionText')
    var questionList = [].slice.call(questionNodes);
    var cleanQuestions = questionList.map(node => {
      return node.innerText
    })
    var companiesAndPositionsNodes = document.querySelectorAll('.authorInfo a');
    var companiesAndPositionsList = [].slice.call(companiesAndPositionsNodes);
    var cleanCompaniesAndPositions = companiesAndPositionsList.map(node => {
      return node.innerText
    })
    var cleanPositions = cleanCompaniesAndPositions.map(string => {
      return string.split(' at')[0];
    })
    var cleanCompanies = cleanCompaniesAndPositions.map(string => {
      return string.split(' at')[1].split(' was')[0];
    })

    var datesNodes = document.querySelectorAll('.cell.alignRt.noWrap.minor.hideHH')
    var dateList = [].slice.call(datesNodes);
    var cleanDates = dateList.map(node => {
      return node.innerText
    })
   return cleanCompanies.map((company, index) => {
      return {
        company,
        position: cleanPositions[index],
        question: cleanQuestions[index],
        date: cleanDates[index]
      }
    })
  })
  .end()
  .then(function (result) {
   
     console.log(result)
        
    })
  .catch(function (error) {
    console.error('Search failed:', error);
  });