var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true
});
require('locus');


nightmare
  .goto('https://www.glassdoor.com/Interview/denver-software-engineer-interview-questions-SRCH_IL.0,6_IM234_KO7,24.htm')
  .wait(2000)
  .evaluate(function () {
    var linkNodes = document.querySelectorAll('.pagingControls .page a');
    var linksList = [].slice.call(linkNodes);
    var links = linksList.map(node => {
      return node.href;
    });
    return [window.location.href, ...links];
  })
  .end()
  .then(function (arrayOfLinks) {
    return arrayOfLinks.map((link) => {
     
      return Nightmare({ show: true })
        .goto(link)
        .wait(2000)
        .evaluate(function () {
          var questionNodes = document.querySelectorAll('p.h3.questionText');
          var questionList = [].slice.call(questionNodes);
          var cleanQuestions = questionList.map(node => {
            return node.innerText;
          });
          var companiesAndPositionsNodes = document.querySelectorAll('.authorInfo a');
          var companiesAndPositionsList = [].slice.call(companiesAndPositionsNodes);
          var cleanCompaniesAndPositions = companiesAndPositionsList.map(node => {
            return node.innerText;
          });
          var cleanPositions = cleanCompaniesAndPositions.map(string => {
            return string.split(' at')[0];
          });
          var cleanCompanies = cleanCompaniesAndPositions.map(string => {
            return string.split(' at')[1].split(' was')[0];
          });

          var datesNodes = document.querySelectorAll('.cell.alignRt.noWrap.minor.hideHH');
          var dateList = [].slice.call(datesNodes);
          var cleanDates = dateList.map(node => {
            return node.innerText;
          });
          return cleanCompanies.map((company, index) => {
            return {
              company,
              position: cleanPositions[index],
              question: cleanQuestions[index],
              date: cleanDates[index]
            };
          });
        })
        .end()
        .then(function (questions) {
          return questions;
        })
        .catch(function (error) {
          console.error('Search failed:', error);
        });
    });
  })
  .then(function (questionPromises) {
    return Promise.all(questionPromises);
    
  })
  .then( function (result) {
    const flattenedQuestions = [].concat(...result);
    console.log(flattenedQuestions);

  })

  .catch(function (error) {
    console.error('Search failed:', error);
  });