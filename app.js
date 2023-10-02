'use strict'

function app(data) {
  // display the initial data
  displayData(data)
  appendList('pullers', data, 'puller')
  appendList('rollers', data, 'roller')

  // populate date picker with todays date
  document.getElementById('date').valueAsDate = new Date()

  // get an array of all input text boxes
  const inputs = document.getElementsByTagName('input')

  for (const input of inputs) {
    input.addEventListener('input', (e) => {
      const filteredData = filterData(data, getInputObj(inputs))
      displayData(filteredData)
    })
  }

  // TODO: create object from current selections to filter data

  // get the save button and add a click handler
  const btnSave = document.getElementById('save')
  btnSave.onclick = () => {
    const record = getInputObj(inputs)
    reset(inputs)
    data.push(record)
    appendList('pullers', data, 'puller')
    appendList('rollers', data, 'roller')
    displayData(data)
  }

  // add click handlers to the +/- buttons
  const inputActions = document.getElementsByClassName('input-action')
  for (let i = 0; i < inputActions.length; i++) {
    inputActions[i].onclick = (e) => {
      action(e.target.dataset.input, e.target.dataset.action)
    }
  }
}

function getFilterObj(target) {
  const obj = { [target.id]: target.value }
  return obj
}

function filterData(data, filterObj) {
  const filterKeys = ['farm', 'patch', 'puller', 'roller']

  for (const key in filterObj) {
    filterKeys.includes(key) ? null : delete filterObj[key]
  }

  const filteredData = data.filter((row) => {
    return (
      //refactor this
      row.farm.toUpperCase().includes(filterObj.farm.toUpperCase()) &&
      row.patch.toUpperCase().includes(filterObj.patch.toUpperCase()) &&
      row.puller.toUpperCase().includes(filterObj.puller.toUpperCase()) &&
      row.roller.toUpperCase().includes(filterObj.roller.toUpperCase())
    )
  })
  return filteredData
}

// display the data table
function displayData(data) {
  // get the output element and clear it
  const results = document.getElementById('results')
  results.replaceChildren()

  // get heading text from first row of data
  if (data.length === 0) return
  const headings = Object.keys(data[0])

  // add the table headings
  const tr = results.appendChild(document.createElement('tr'))
  for (const heading of headings) {
    const th = tr.appendChild(document.createElement('th'))
    th.innerText = heading[0].toUpperCase() + heading.slice(1)
  }

  // add the table data rows
  for (const row of data) {
    const tr = results.appendChild(document.createElement('tr'))
    for (const key in row) {
      const td = tr.appendChild(document.createElement('td'))
      td.innerHTML = row[key]
    }
  }
}

// add an unordered list
function appendList(parentId, data, itemId) {
  // get the parent element, clear it, append a ul element
  const parent = document.getElementById(parentId)
  parent.replaceChildren()
  const ul = parent.appendChild(document.createElement('ul'))
  ul.innerHTML = `<b>${itemId[0].toUpperCase() + itemId.slice(1)} totals</b>`

  // organize the data
  const list = data.map((item) => item[itemId])
  const unique = list.filter((v, i, a) => a.indexOf(v) == i)
  const sorted = unique.toSorted((a, b) => a > b)

  // add <li> for each list item
  sorted.forEach((element) => {
    const li = ul.appendChild(document.createElement('li'))
    // li.innerHTML = element
    li.innerHTML = `${element} (${getPullerSummary(data, itemId, element)})`
  })
}

function getPullerSummary(data, heading, value) {
  const filtered = data.filter((row) => row[heading] === value)
  return filtered.reduce((a, row) => a + parseFloat(row.vines), 0)
}

// save the current input values into data
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
    date: '2023-10-01',
    farm: 'GRT',
    patch: '1',
    row: '1',
    vines: '50',
    puller: 'B',
    roller: 'x',
  },
  {
    date: '2023-10-01',
    farm: 'GRT',
    patch: '1',
    row: '2',
    vines: '52',
    puller: 'P',
    roller: '-',
  },
  {
    date: '2023-10-01',
    farm: 'Lanteri',
    patch: '9',
    row: '10',
    vines: '20',
    puller: 'P',
    roller: 'x',
  },
  {
    date: '2023-10-01',
    farm: 'Lanteri',
    patch: '9',
    row: '11',
    vines: '22',
    puller: 'V',
    roller: 'x',
  },
]

// run the app
app(data)
