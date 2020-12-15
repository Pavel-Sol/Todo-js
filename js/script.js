let form = document.querySelector('.todo-control')
let todoList = document.querySelector('#todo')
let completedList = document.querySelector('#completed')
let formInput = document.querySelector('.form__input')
let data = {
    todo: [],
    completed: [],
}

if (localStorage.getItem('LocalData')) {
    data = JSON.parse(localStorage.getItem('LocalData'))
}


form.addEventListener('submit', function (event) {
    event.preventDefault()
    if (formInput.value !== '') {
        addItem(formInput.value)
    }
})

function addItem(text) {
    data.todo.push(text)
    renderItem(text)
    formInput.value = '';

    dataUpdateToLocalS()
}




function renderItem(text, completed = false) {
    const item = document.createElement('li')
    const itemDest = document.createElement('div')
    const todoButtons = document.createElement('div')
    const todoCompleteBtn = document.createElement('button')
    const todoRemoveBtn = document.createElement('button')

    let list
    if (completed) {
        list = completedList
    } else {
        list = todoList
    }

    todoRemoveBtn.addEventListener('click', function (event) {
        removeItem(event.target)
    })

    todoCompleteBtn.addEventListener('click', function (event) {
        completeItem(event.target)
    })

    item.classList.add('todo__item')
    itemDest.classList.add('todo__desc')
    todoButtons.classList.add('todo__buttons')
    todoCompleteBtn.classList.add('todo__complete')
    todoRemoveBtn.classList.add('todo__remove')

    list.insertBefore(item, list.childNodes[0])
    item.appendChild(itemDest)
    itemDest.textContent = text
    item.appendChild(todoButtons)
    todoButtons.appendChild(todoCompleteBtn)
    todoButtons.appendChild(todoRemoveBtn)
}



function removeItem(elem) {
    let item = elem.closest('.todo__item')
    let itemParent = elem.closest('.todo__item').closest('.todo')
    let id = itemParent.id
    let text = item.querySelector('.todo__desc').textContent

    if (id == 'todo') {
        data.todo.splice(data.todo.indexOf(text), 1)
    } else {
        data.completed.splice(data.completed.indexOf(text), 1)
    }

    itemParent.removeChild(item)

    dataUpdateToLocalS()
}




function completeItem(elem) {
    let item = elem.closest('.todo__item')
    let itemParent = elem.closest('.todo__item').closest('.todo')
    let id = itemParent.id
    let text = item.querySelector('.todo__desc').textContent

    let target

    if (id == 'todo') {
        target = completedList
    } else {
        target = todoList
    }

    if (id == 'todo') {
        data.todo.splice(data.todo.indexOf(text), 1)
        data.completed.push(text)
    } else {
        data.completed.splice(data.todo.indexOf(text), 1)
        data.todo.push(text)
    }


    itemParent.removeChild(item)
    target.insertBefore(item, target.childNodes[0])

    dataUpdateToLocalS()
}

// ---------------------------------------------------------
// LocalStorage

function dataUpdateToLocalS() {
    localStorage.setItem('LocalData', JSON.stringify(data))
}



function renderItemsForUpdate() {
    if (!data.todo.length && !data.completed.length) {
        return
    } else {
        for (let i = 0; i < data.todo.length; i++) {
            renderItem(data.todo[i])
        }

        for (let i = 0; i < data.completed.length; i++) {
            renderItem(data.completed[i], true)
        }
    }
}


renderItemsForUpdate()