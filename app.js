const $forms = document.querySelectorAll('.signup-form');
// console.log($forms);

const getTemplate = async () => {
  return fetch('./template.html')
    .then(response => response.text())
    .catch(error => console.log(error));
};

const sendEmailToApi = (address, template) => {
  fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: address,
      template: template,
    }),
  })
    .then(results => {
      if (results.status == 200) {
        alert('E-mail send!!!');
      } else {
        alert('Send failed');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Send failed');
    });
};

function sendMail(e) {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  getTemplate()
    .then(template => sendEmailToApi(email, template))
    .catch(error => console.log(error, 'error al obtener el template'));
}

for (let i = 0; i < $forms.length; i++) {
  const element = $forms[i];
  element.addEventListener('submit', sendMail);
}
