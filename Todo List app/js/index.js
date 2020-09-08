// Start
// 1. View tasks
// 1.1 function to add task to page
function DisplayTask(value) {
    // create an element li with the target attribute
    li = document.createElement('li')
    li.className = "list-group-item list-group-item-action"
    // create delete icon with the target attribute
    i = document.createElement('i')
    i.className = "fas fa-window-close delete-icon"
    // append text and icon
    li.appendChild(document.createTextNode(value))
    li.appendChild(i)
    // write it to html
    document.getElementById('task-list').appendChild(li)
}
// 1.2 Function to get tasks from local storage and display it
function DisplayTasksToPage() {
    to_display = JSON.parse(localStorage.getItem('tasks'))
    if (to_display === null) {
        localStorage.setItem('tasks', JSON.stringify(["this is a sample task"]))
        DisplayTasksToPage()
    } else {
        console.log(to_display)
        for (let i = 0; i < to_display.length; i++) {
            DisplayTask(to_display[i])
        }
    }
}
// Need to run the function once
DisplayTasksToPage()


// 2. Add task
// 2.1 Event listner to check for submit event in forms[0] (the only form!)
document.forms[0].addEventListener('submit', function (e) {
    newValue = document.getElementById('taskInput').value.toString()
    // add task to local storage if it not contains only space/tabs
    if (newValue.replace(/\s/g, '').length) {
        addItem(newValue)
    } else {
        alert("Your string is invalid as it contains only spaces")
    }
    e.preventDefault()
})
// 2.2 Function to add new task to local storage
function addItem(item) {
    task_list = JSON.parse(localStorage.getItem('tasks'))
    if (task_list == 1) {
        task_list = [item]
        localStorage.setItem('tasks', task_list)
    } else {
        task_list.push(item)
        localStorage.setItem('tasks', JSON.stringify(task_list))
    }
    DisplayTask(item)
}


// 3. Delete task(s)
// 3.1 Event listner to check for click event in list-group class
document.querySelector('.list-group').addEventListener('click', function (e) {
    item = e.target;
    if (item.classList.contains('delete-icon')) {
        key = item.parentElement.textContent
        deleteItem(key)
        item.parentElement.remove()
        // need to add a function to delete it from storage
    }
    e.preventDefault()
})
// 3.2 Function to delete task from storage
function deleteItem(item) {
    task_list = JSON.parse(localStorage.getItem('tasks'))
    var index = task_list.indexOf(item);
    if (index > -1) {
        task_list.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(task_list))
}
// End