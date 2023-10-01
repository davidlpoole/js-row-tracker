'use strict'

function app() {
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
  ]

  document.getElementById('date').valueAsDate = new Date()
  displayData(data)
  appendList('pullers', data, 'puller')
  appendList('rollers', data, 'roller')

  const inputs = document.getElementsByTagName('input')

  const btnSave = document.getElementById('save')
  btnSave.onclick = () => {
    const record = save(inputs)
    reset(inputs)
    data.push(record)
    appendList('pullers', data, 'puller')
    appendList('rollers', data, 'roller')
    displayData(data)
  }

  function action(inputId, actionId) {
    const input = document.getElementById(inputId)
    switch (actionId) {
      case 'inc':
        input.value++
        break
      case 'dec':
        input.value > 1 ? input.value-- : (input.value = 1)
        break

      default:
        alert('action not found')
        break
    }
  }

  const inputActions = document.getElementsByClassName('input-action')
  for (let i = 0; i < inputActions.length; i++) {
    inputActions[i].onclick = (e) => {
      action(e.target.dataset.input, e.target.dataset.action)
    }
  }
}

function displayData(data) {
  console.log(data)
  const headings = Object.keys(data[0])
  const results = document.getElementById('results')
  results.replaceChildren()
  const tr = results.appendChild(document.createElement('tr'))
  for (const heading of headings) {
    const th = tr.appendChild(document.createElement('th'))
    th.innerText = heading[0].toUpperCase() + heading.slice(1)
  }

  for (const row of data) {
    const tr = results.appendChild(document.createElement('tr'))
    for (const key in row) {
      const td = tr.appendChild(document.createElement('td'))
      td.innerHTML = row[key]
    }
  }
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
  const toReset = ['puller', 'roller']
  for (let i = 0; i < inputs.length; i++) {
    if (toReset.includes(inputs[i].id)) inputs[i].value = ''
  }
}

app()
