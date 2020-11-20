const form = document.querySelector('form')

const showFormData = () => {
  const formData = new FormData(form)
  console.log('formData')
  console.log(formData)
  for (const pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
}

const handleEvent = (e) => {
  e.preventDefault()
  showFormData()
}

form.addEventListener('submit', handleEvent)
