function app() {
  const data = []
  const btnSave = document.getElementById('save')
  btnSave.onclick = () => {
    const record = save()
    data.push(record)
  }
}

function save() {
  const temp = {}
  const inputs = document.getElementsByTagName('input')
  for (let i = 0; i < inputs.length; i++) {
    temp[inputs[i].id] = inputs[i].value
  }
  return temp
}

app()
