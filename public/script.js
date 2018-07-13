document.querySelector('form').addEventListener('submit', getToken)

async function getToken(event) {
  event.preventDefault();
  const email = event.target[0].value;
  const appName = event.target[1].value;

  const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, appName })
  };
  const response = await fetch('/api/v1/authenticate', options);
  const token = await response.json();

  showToken(token.token);
}

function showToken(token) {
  var tokenP = document.createElement('p');
  const tokenText = document.createTextNode(`Your token is: ${token}`)
  tokenP.appendChild(tokenText)
  document.body.appendChild(tokenP)
}
