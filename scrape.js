var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true
});

nightmare
  .goto('https://www.builtincolorado.com/companies?status=hiring_now')
  .evaluate(function () {
    var allCompanies = document.querySelectorAll('.wrap-view-page a')
    var list = [].slice.call(allCompanies); // Why did I have to do this?
    return list.map(function (node) {
      return node.href
    });
  })
  .end()
  .then(function (result) {
    result.map(endpoint => {
      nightmare
        .goto(endpoint)
        .evaluate(function () {
          var name = document.querySelector('.company-card-title h1').innerText;
          var industry = document.querySelector('.col-industry .item').innerText;
          var tatalEmployees = document.querySelector('.field_total_employees .item').innerText;
          var localEmployees = document.querySelector('.field_local_employees .item').innerText;
          var openJobs = document.querySelectorAll('.job-opportunities div.title').length;

          var benefitsNodes = document.querySelectorAll('.notice-title div')
          var allBenefits = [].slice.call(benefitsNodes);
          var benefits = allBenefits.map(benefit => {
            return benefit.innerHTML
          })

          
        });
    })
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });