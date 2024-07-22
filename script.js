document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task-button');
    const newTaskInput = document.getElementById('new-task-input');
    const taskDateInput = document.getElementById('task-date');
    const taskPriorityInput = document.getElementById('task-priority');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-button');

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterTasks(button.getAttribute('data-filter'));
        });
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        const taskDate = taskDateInput.value;
        const taskPriority = taskPriorityInput.value;

        if (taskText === '') return;

        const taskItem = document.createElement('li');
        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const taskName = document.createElement('span');
        taskName.textContent = taskText;
        taskInfo.appendChild(taskName);

        if (taskDate) {
            const taskDueDate = document.createElement('span');
            taskDueDate.textContent = `Due: ${taskDate}`;
            taskInfo.appendChild(taskDueDate);
        }

        const taskPrioritySpan = document.createElement('span');
        taskPrioritySpan.textContent = `Priority: ${taskPriority}`;
        taskInfo.appendChild(taskPrioritySpan);

        taskItem.appendChild(taskInfo);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => editTask(taskItem, taskName, taskDueDate, taskPrioritySpan));
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });
        taskItem.appendChild(deleteButton);

        taskItem.addEventListener('click', (e) => {
            if (e.target !== editButton && e.target !== deleteButton) {
                taskItem.classList.toggle('completed');
            }
        });

        taskList.appendChild(taskItem);

        newTaskInput.value = '';
        taskDateInput.value = '';
    }

    function editTask(taskItem, taskName, taskDueDate, taskPrioritySpan) {
        const newTaskText = prompt('Edit task', taskName.textContent);
        const newTaskDate = prompt('Edit due date', taskDueDate ? taskDueDate.textContent.split(': ')[1] : '');
        const newTaskPriority = prompt('Edit priority', taskPrioritySpan.textContent.split(': ')[1]);

        if (newTaskText) taskName.textContent = newTaskText;
        if (newTaskDate) taskDueDate.textContent = `Due: ${newTaskDate}`;
        if (newTaskPriority) taskPrioritySpan.textContent = `Priority: ${newTaskPriority}`;
    }

    function filterTasks(filter) {
        const tasks = taskList.querySelectorAll('li');
        tasks.forEach(task => {
            switch (filter) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'completed':
                    task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                    break;
                case 'pending':
                    task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                    break;
            }
        });
    }
});
