'use strict'

function app() {
  const data = []

  const inputs = document.getElementsByTagName('input')
  // const btnSave = document.getElementById('save')
  const btnNext = document.getElementById('next')

  // btnSave.onclick = () => {
  //   const record = save(inputs)
  //   reset(inputs)
  //   data.push(record)
  //   displayData(data)
  // }

  btnNext.onclick = () => {
    const record = nextRow(inputs)
    data.push(record)
    displayData(data)
  }
}

function displayData(data) {
  const results = document.getElementById('results')
  results.innerHTML = JSON.stringify(data)
}

function save(inputs) {
  const record = {}
  for (let i = 0; i < inputs.length; i++) {
    record[inputs[i].id] = inputs[i].value
  }
  return record
}

function reset(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = ''
  }
}

function nextRow(inputs) {
  const record = save(inputs)
  const resetIds = ['puller', 'roller1', 'roller2']
  for (let i = 0; i < inputs.length; i++) {
    if (resetIds.includes(inputs[i].id)) {
      inputs[i].value = ''
    } else if (inputs[i].id === 'row') {
      inputs[i].value++
    }
  }
  return record
}

app()
