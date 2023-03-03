const adviceGenerator = document.querySelector('.advice-generator')
const advice = adviceGenerator.querySelector('.advice')

function getAdvice () {
  fetch('https://api.adviceslip.com/advice', {
    cache: 'reload'
  })
    .then(response => response.json())
    .then(response => {
      const slip = response.slip
      const string = `<h2 class="title">Advice #${slip.id}</h2>
        <blockquote>
              <p>${slip.advice}</p>
            </blockquote>`
      advice.innerHTML = string
    })
}
adviceGenerator.addEventListener('click', e => {
  if (!e.target.closest('.button')) return
  getAdvice()
})
