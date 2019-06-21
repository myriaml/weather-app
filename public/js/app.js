const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('h2') 
const messageTwo = document.querySelector('p.texte') 

weatherForm.addEventListener('submit',(e) => {
	e.preventDefault()

	const location = search.value
	messageOne.textContent  = "Chargement..."
	messageTwo.textContent = ''

	fetch('/weather?adresse='+location).then((response) => {
		response.json().then((data) => {
			if(data.error){
				messageOne.textContent = 'Erreur'
				messageTwo.textContent = 'Veuiller entrer une adresse ou une adresse valide'
			}
			else{
				messageTwo.textContent = data.forecast
				messageOne.textContent = data.location
			}
		})
	})
})