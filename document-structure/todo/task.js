// Находим основные элементы
const form = document.getElementById('tasks__form');
const input = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');

// Ключ для localStorage
const STORAGE_KEY = 'todo_tasks';

let tasks = [];

/**
 * Сохраняет текущий массив задач в localStorage.
 */
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Создает DOM-элемент задачи и добавляет его в список.
 * @param {string} taskText - Текст новой задачи.
 */
function addTaskToDOM(taskText) {
    // Создаем главный div.task
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    // Создаем div.task__title
    const titleDiv = document.createElement('div');
    titleDiv.className = 'task__title';
    titleDiv.textContent = taskText;

    // Создаем ссылку a.task__remove
    const removeLink = document.createElement('a');
    removeLink.href = '#';
    removeLink.className = 'task__remove';
    removeLink.innerHTML = '&times;'; // HTML-сущность для крестика "×"


    removeLink.addEventListener('click', (event) => {
        // 1. Отменяем стандартное поведение ссылки
        event.preventDefault();

        // 2. Находим индекс этой задачи
        // Мы находим родительский `taskDiv` и его индекс среди всех `task`
        const allTasks = Array.from(tasksList.children);
        const index = allTasks.indexOf(taskDiv);

        // 3. Удаляем задачу из массива по индексу
        if (index > -1) {
            tasks.splice(index, 1);
        }

        // 4. Сохраняем обновленный массив в localStorage
        saveTasks();

        // 5. Удаляем элемент задачи из DOM
        taskDiv.remove();
    });

    // Собираем элемент задачи
    taskDiv.appendChild(titleDiv);
    taskDiv.appendChild(removeLink);

    // Добавляем готовую задачу в список на странице
    tasksList.appendChild(taskDiv);
}

/**
 * Обработчик отправки формы (нажатие Enter или кнопки "Добавить").
 */
form.addEventListener('submit', (event) => {
    // 1. Отменяем стандартную отправку формы
    event.preventDefault();

    // 2. Получаем текст из поля ввода, убирая лишние пробелы
    const taskText = input.value.trim();

    // 3. Если текст есть:
    if (taskText) {
        // Добавляем в массив
        tasks.push(taskText);
        // Сохраняем в localStorage
        saveTasks();
        // Добавляем в DOM
        addTaskToDOM(taskText);
        // Очищаем форму
        form.reset();
    }
});

function loadTasks() {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
        // 1. Парсим JSON-строку обратно в массив
        tasks = JSON.parse(savedTasks);
        // 2. Отрисовываем каждую задачу из массива
        tasks.forEach(task => addTaskToDOM(task));
    }
}

// Запускаем загрузку задач, как только скрипт выполнится
loadTasks();
