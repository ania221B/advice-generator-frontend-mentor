const adviceGenerator = document.querySelector('.advice-generator')
const advice = adviceGenerator.querySelector('.advice')

function getAdvice () {
  fetch('https://api.adviceslip.com/advice', {
    cache: 'reload'
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log(response)
        return Promise.reject(response.statusText)
      }
    })
    .then(body => {
      if (!body.slip) {
        const message = body.message
        const string = `<h2 class="title">${message.type}</h2>
        <img src="images/error-icon.svg" alt="">        
        <p>${message.text}</p>`
        advice.innerHTML = string
      } else {
        const slip = body.slip
        const string = `<h2 class="title">Advice #${slip.id}</h2>
        <blockquote>
              <p>${slip.advice}</p>
            </blockquote>`
        advice.innerHTML = string
      }
    })
    .catch(_ => {
      const string = `<h2 class="title">Connection Error</h2>
        <img src="images/error-icon.svg" alt="">        
          <p>Service is unreachable. Please check network connection.</p>
         `
      advice.innerHTML = string
    })
}
adviceGenerator.addEventListener('click', e => {
  if (!e.target.closest('.button')) return
  getAdvice()
})
