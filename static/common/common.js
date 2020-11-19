
const showFormData = () => {
  const formClass = 'form'
  const form = document.querySelectorAll(formClass)[0]
  const formData = new FormData(form)
  console.log("formData")
  console.log(formData)
  for (var pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
}

const onSubmit = () => {
  alert('submit')
  return false
}
