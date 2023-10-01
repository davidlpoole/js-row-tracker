'use strict'

function app() {
  const data = []

  const inputs = document.getElementsByTagName('input')
  const btnSave = document.getElementById('save')

  btnSave.onclick = () => {
    const record = save(inputs)
    reset(inputs)
    data.push(record)
    displayData(data)
  }
}

function displayData(data) {
  const results = document.getElementById('results')
  results.innerHTML = JSON.stringify(data)
}

function save(inputs) {
  const temp = {}
  for (let i = 0; i < inputs.length; i++) {
    temp[inputs[i].id] = inputs[i].value
  }
  return temp
}

function reset(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = ''
  }
}

app()
