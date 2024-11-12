let taskList = []
let sortAscending = true // Toggle for sorting order
const newTaskInput = document.querySelector('#newTask .task-item input')
const newTaskContainer = document.querySelector('#newTask')
const taskListContainer = document.querySelector('#taskCollection')
let draggedTaskIndex = null;

document.querySelector('.add-button .label').addEventListener('click', () => {
    if (!newTaskInput.value) return

    taskListContainer.classList.remove('hidden')
    newTaskContainer.classList.add('hidden')

    taskList.push({ content: newTaskInput.value })
    newTaskInput.value = ''

    updateList()
})

const updateList = () => {
    taskListContainer.innerHTML = ''
    taskList.forEach((t, i) => {
        taskListContainer.innerHTML += `
        <li class='task-item' draggable='true' data-id='${i}'>
            <span>${i + 1}.</span>
            <p class='task-content'>${t.content}</p>
            <button class='delete-btn' data-id='${i}'>✕</button>
        </li>
        `
    })
    attachEventListeners()
}

const attachEventListeners = () => {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const taskId = event.target.getAttribute('data-id')
            deleteTask(taskId)
        })
    })
    document.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart)
        item.addEventListener('dragover', handleDragOver)
        item.addEventListener('drop', handleDrop)
        item.addEventListener('dragend', handleDragEnd)
    })
}

const handleDragStart = (event) => {
    draggedTaskIndex = event.target.getAttribute('data-id')
}

const handleDragOver = (event) => {
    event.preventDefault() // Necessary to allow dropping
}

const handleDrop = (event) => {
    const targetTaskIndex = event.target.closest('.task-item').getAttribute('data-id')
    if (draggedTaskIndex !== targetTaskIndex) {
        const draggedTask = taskList[draggedTaskIndex]
        taskList.splice(draggedTaskIndex, 1)
        taskList.splice(targetTaskIndex, 0, draggedTask)

        updateList()
    }
}

const handleDragEnd = () => {
    draggedTaskIndex = null
}

const deleteTask = (taskId) => {
    taskList.splice(taskId, 1)
    updateList()
}

// Sorting function
const sortTasks = () => {
    taskList.sort((a, b) => {
        if (a.content.toLowerCase() < b.content.toLowerCase()) return sortAscending ? -1 : 1
        if (a.content.toLowerCase() > b.content.toLowerCase()) return sortAscending ? 1 : -1
        return 0
    })
    sortAscending = !sortAscending // Toggle the sorting order for next click
    updateList()
}

document.querySelector('#sortTasks').addEventListener('click', sortTasks)

document.querySelector('.add-button .add-icon').addEventListener('click', () => {
    if (taskListContainer.classList.contains('hidden')) return
    taskListContainer.classList.toggle('hidden')
    newTaskContainer.classList.toggle('hidden')
})
