/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

import refs from './js/refs.js';
import { renderTasks } from './js/render-tasks.js';
import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
  clearTasksFromLocalStorage,
} from './js/local-storage-api.js';
import { toggleTheme } from './js/theme-switcher.js';
// Initialize an empty array to hold tasks
// This will be used to store tasks in memory and also to sync with local storage
let tasks = [];

// Load tasks from local storage when the script runs
if (localStorage.getItem('tasks')) {
  const storedTasks = loadTasksFromLocalStorage();
  if (storedTasks && storedTasks.length > 0) {
    tasks = storedTasks;
    renderTasks(tasks); // Render tasks if there are any in local storage
  }
} else {
  clearTasksFromLocalStorage(); // Clear local storage if no tasks exist
}

// const savedTheme = localStorage.getItem('theme'); 
// if (savedTheme === 'light') {
//   document.body.classList.add('theme-light');
//   document.body.classList.remove('theme-dark');
// } else {
//   document.body.classList.add('theme-dark');
//   document.body.classList.remove('theme-light');
// }
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.classList.remove('theme-light', 'theme-dark'); // Remove both themes first
document.body.classList.add(`theme-${savedTheme}`);

// Add event listener to the form to handle submission
refs.form.addEventListener('submit', event => {
  event.preventDefault(); // Prevent the default form submission behavior

  const title = event.target.taskName.value.trim();
  const description = event.target.taskDescription.value.trim();

  if (title && description) {
    const task = { title, description };
    tasks.push(task); // Add the new task to the tasks array
  } else {
    alert('Please enter both title and description for the task.');
  }
  refs.form.reset(); // Reset the form fields
  renderTasks(tasks);
  saveTasksToLocalStorage(tasks); // Save tasks to local storage
});

// Add event listener to the task list for handling delete button clicks
refs.taskList.addEventListener('click', event => {
  if (event.target.classList.contains('task-list-item-btn')) {
    const taskItem = event.target.closest('.task-list-item');
    const taskIndex = Array.from(refs.taskList.children).indexOf(taskItem);
    tasks.splice(taskIndex, 1); // Remove the task from the tasks array
    saveTasksToLocalStorage(tasks); // Update local storage with the new tasks array
    renderTasks(tasks); // Re-render the task list
  }
});

// Add event listener to the theme toggle button
refs.chengeTheme.addEventListener('click', () => {
  toggleTheme(); // Call the function to toggle the theme
});
