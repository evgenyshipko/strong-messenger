
const setValues = () => {
  const inputCollection = document.getElementsByClassName("profile-form-item__input")
  Array.from(inputCollection).forEach((input) => {
    switch (input.name) {
      case('email'):
        input.value = "test@test.com"
        break
      case('login'):
        input.value = "evgeny"
        break
      case('firstname'):
        input.value = "Evgeny"
        break
    }
  })
}

window.addEventListener('load', setValues)
