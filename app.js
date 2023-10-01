'use strict'

function app() {
  const data = []

  const inputs = document.getElementsByTagName('input')

  // const btnNext = document.getElementById('next')
  // btnNext.onclick = () => {
  //   const record = nextRow(inputs)
  //   data.push(record)
  //   displayData(data)
  // }

  const btnSave = document.getElementById('save')
  btnSave.onclick = () => {
    const record = save(inputs)
    reset(inputs)
    data.push(record)
    displayData(data)
    appendList('pullers', data, 'puller')
    appendList('rollers', data, 'roller')
  }
}

function displayData(data) {
  const results = document.getElementById('results')
  results.replaceChildren()
  const ul = results.appendChild(document.createElement('ul'))
  data.forEach((element) => {
    const li = ul.appendChild(document.createElement('li'))
    li.innerHTML = JSON.stringify(element)
  })
}

function appendList(parentId, data, itemId) {
  const parent = document.getElementById(parentId)
  parent.replaceChildren()
  const ul = parent.appendChild(document.createElement('ul'))

  const list = data.map((item) => item[itemId])
  const unique = list.filter((v, i, a) => a.indexOf(v) == i)
  const sorted = unique.toSorted((a, b) => a > b)

  sorted.forEach((element) => {
    const li = ul.appendChild(document.createElement('li'))
    li.innerHTML = element
  })
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

// function nextRow(inputs) {
//   const record = save(inputs)
//   const resetIds = ['puller', 'roller1', 'roller2']
//   for (let i = 0; i < inputs.length; i++) {
//     if (resetIds.includes(inputs[i].id)) {
//       inputs[i].value = ''
//     } else if (inputs[i].id === 'row') {
//       inputs[i].value++
//     }
//   }
//   return record
// }

app()
