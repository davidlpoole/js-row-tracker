'use strict'

const today = new Date().toJSON().split('T')[0]
const inputs = document.getElementsByTagName('input')

function app(data) {
  // display the initial data
  appendList('farms', data, 'farm')
  appendList('pullers', data, 'puller')
  appendList('rollers', data, 'roller')

  // populate date picker with todays date
  document.getElementById('date').value = today

  // get an array of all input text boxes
  displayData(data)

  // if input changes, filter the data and display
  for (const input of inputs) {
    input.addEventListener('input', (e) => {
      displayData(data)
    })
  }

  // get the save button and add a click handler
  const btnSave = document.getElementById('save')
  btnSave.onclick = () => handleSave(data, inputs)

  // add click handlers to the +/- buttons
  const inputActions = document.getElementsByClassName('input-action')
  for (let i = 0; i < inputActions.length; i++) {
    inputActions[i].onclick = (e) => {
      action(e.target.dataset.input, e.target.dataset.action)
      displayData(data)
      reset(inputs)
    }
  }
}

function handleSave(data, inputs) {
  const record = getInputObj(inputs)

  // check required fields
  for (const input of inputs) {
    const isValid = input.reportValidity()
    if (!isValid) return
  }

  data.push(record)
  // appendList('farms', data, 'farm')
  displayData(data)
  appendList('pullers', data, 'puller')
  appendList('rollers', data, 'roller')
  reset(inputs)
}

function getFilterObj(target) {
  const obj = { [target.id]: target.value }
  return obj
}

function filterData(data, filterObj) {
  // const filterKeys = ['date', 'farm', 'row', 'patch', 'puller', 'roller']

  // for (const key in filterObj) {
  //   filterKeys.includes(key) ? null : delete filterObj[key]
  // }

  const filteredData = data.filter((row) => {
    return (
      // TODO: refactor this
      row.date.toUpperCase().includes(filterObj.date.toUpperCase()) &&
      row.farm.toUpperCase().includes(filterObj.farm.toUpperCase()) &&
      // row.row.toUpperCase().includes(filterObj.row.toUpperCase()) &&
      // row.patch.toUpperCase().includes(filterObj.patch.toUpperCase()) &&
      row.puller.toUpperCase().includes(filterObj.puller.toUpperCase()) &&
      row.roller.toUpperCase().includes(filterObj.roller.toUpperCase())
    )
  })
  return filteredData
}

// display the data table
function displayData(allData) {
  // get the output element and clear it
  const results = document.getElementById('results')
  results.replaceChildren()

  // filter the data based on selections
  const data = filterData(allData, getInputObj(inputs))

  // get heading text from first row of data
  if (data.length === 0) return
  const headings = Object.keys(data[0])

  // add the table headings
  const tr = results.appendChild(document.createElement('tr'))
  for (const heading of headings) {
    const th = tr.appendChild(document.createElement('th'))
    th.innerText = heading[0].toUpperCase() + heading.slice(1)
  }
  let sum = 0
  // add the table data rows
  for (const row of data) {
    const tr = results.appendChild(document.createElement('tr'))
    for (const key in row) {
      if (key === 'vines') sum += parseFloat(row[key])
      const td = tr.appendChild(document.createElement('td'))
      td.innerHTML = row[key]
    }
  }
  const sumRow = results.appendChild(document.createElement('tr'))
  const sumTd = results.appendChild(document.createElement('td'))
  sumTd.colSpan = 7
  sumTd.innerHTML = `Total vines: ${sum}`
}

// add an unordered list
function appendList(parentId, data, itemId) {
  // get the parent element, clear it, append a ul element
  const parent = document.getElementById(parentId)
  parent.replaceChildren()
  const div = parent.appendChild(document.createElement('div'))
  div.innerHTML = `<b>${itemId[0].toUpperCase() + itemId.slice(1)}s</b><br />`

  // organize the data
  const list = data.map((item) => item[itemId])
  const unique = list.filter((v, i, a) => a.indexOf(v) == i)
  const sorted = unique.toSorted((a, b) => a > b)

  // add button for each list item
  sorted.forEach((element) => {
    const button = document.createElement('button')
    button.onclick = () => {
      setValue(itemId, element)
      displayData(data)
    }
    // button.innerHTML = `${element} (${getSummary(data, itemId, element)})`
    button.innerHTML = `${element}`
    div.appendChild(button)
  })
}

// add an unordered list
function appendSummary(parentId, data, itemId) {
  // get the parent element, clear it, append a ul element
  const parent = document.getElementById(parentId)
  parent.replaceChildren()
  const div = parent.appendChild(document.createElement('div'))
  // div.innerHTML = `<b>${itemId[0].toUpperCase() + itemId.slice(1)}s</b><br />`

  // organize the data
  const list = data.map((item) => item[itemId])
  const unique = list.filter((v, i, a) => a.indexOf(v) == i)
  const sorted = unique.toSorted((a, b) => a > b)

  // add button for each list item
  sorted.forEach((element) => {
    const el = document.createElement('div')
    el.innerHTML = `${element}: ${getSummary(data, itemId, element)} vines`
    div.appendChild(el)
  })
}

function getSummary(data, heading, value) {
  const filtered = data.filter((row) => row[heading] === value)
  return filtered.reduce((a, row) => a + parseFloat(row.vines), 0)
}

function setValue(inputId, value) {
  const el = document.getElementById(inputId)
  el.value = value
}

// return the current input values as an object
function getInputObj(inputs) {
  const record = {}
  for (let i = 0; i < inputs.length; i++) {
    record[inputs[i].id] = inputs[i].value
  }
  return record
}

// clear the inputs (only if the input is in the list of id's)
function reset(inputs) {
  const toReset = ['puller', 'roller']
  for (let i = 0; i < inputs.length; i++) {
    if (toReset.includes(inputs[i].id)) inputs[i].value = ''
  }
}

// use the buttons data attributes to update a text input value
function action(inputId, actionId) {
  const input = document.getElementById(inputId)
  switch (actionId) {
    case 'inc':
      input.value++
      break
    case 'dec':
      // don't decrease lower than MIN
      const MIN = 1
      input.value > MIN ? input.value-- : (input.value = MIN)
      break

    default:
      alert('Error: invalid action')
      break
  }
}

// set up some initial data
const data = [
  {
    date: today,
    farm: 'GRT',
    patch: '1',
    row: '1',
    vines: '50',
    puller: 'B',
    roller: 'x',
  },
  {
    date: today,
    farm: 'GRT',
    patch: '1',
    row: '2',
    vines: '52',
    puller: 'P',
    roller: '-',
  },
  {
    date: today,
    farm: 'Lanteri',
    patch: '9',
    row: '10',
    vines: '20',
    puller: 'P',
    roller: 'x',
  },
  {
    date: today,
    farm: 'Lanteri',
    patch: '9',
    row: '11',
    vines: '22',
    puller: 'V',
    roller: 'x',
  },
  {
    date: today,
    farm: 'Lanteri',
    patch: '10',
    row: '11',
    vines: '22',
    puller: 'V',
    roller: 'x',
  },
  {
    date: today,
    farm: 'Lanteri',
    patch: '10',
    row: '12',
    vines: '22',
    puller: 'P',
    roller: '-',
  },
]

// run the app
app(data)
