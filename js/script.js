const adviceGenerator = document.querySelector('.advice-generator')
const advice = adviceGenerator.querySelector('.advice')

function getAdvice () {
  fetch('https://api.adviceslip.com/advice', {
    cache: 'reload'
  })
    .then(response => {
      if (response.ok) return response.json()
      return Promise.reject(response)
    })
    .then(body => {
      if (!body.slip) {
        const message = body.message
        const string = `
        <img src="images/error-icon.svg" alt="">
        <h2 class="title error-title">${message.type}</h2>    
        <p>${message.text}</p>`

        advice.innerHTML = DOMPurify.sanitize(string)
      } else {
        const slip = body.slip
        const string = `<h2 class="title">Advice #${slip.id}</h2>
        <blockquote>
              <p>${slip.advice}</p>
            </blockquote>`

        advice.innerHTML = DOMPurify.sanitize(string)
      }
    })
    .catch(error => {
      const string = !error.body
        ? `
      <img src="images/error-icon.svg" alt="">
      <h2 class="title error-title">Network Error</h2>
      <p>Please check network connection or contact support.</p>
      `
        : `
      <img src="images/error-icon.svg" alt="">
      <header>
      <h2 class="title error-title">Error</h2>
      <p class="error-subtitle">Code: ${error.status}</p>
      <p class="error-subtitle">Message: ${error.statusText}</p>  
      </header>     
      <p>Please check network connection or contact support.</p>
      `
      advice.innerHTML = DOMPurify.sanitize(string)
    })
}
adviceGenerator.addEventListener('click', e => {
  if (!e.target.closest('.button')) return
  getAdvice()
})
