// Находим форму и элемент progress
const form = document.getElementById('form');
const progress = document.getElementById('progress');

// Добавляем обработчик на событие "submit" (отправка формы)
form.addEventListener('submit', (e) => {
    // 1. Отменяем стандартное поведение формы (которое перезагружает страницу)
    e.preventDefault();

    // Сбрасываем прогресс-бар в начало при каждой новой отправке
    progress.value = 0;

    // 2. Создаем объект XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // 3. Отслеживаем событие 'progress' на объекте xhr.upload
    xhr.upload.addEventListener('progress', (event) => {
        // Проверяем, что сервер предоставил общий размер файла
        if (event.lengthComputable) {
            // Рассчитываем долю загруженного (от 0.0 до 1.0)
            const percentComplete = event.loaded / event.total;
            // Устанавливаем это значение в наш progress-бар
            progress.value = percentComplete;
        }
    });

    // Обрабатываем успешное завершение
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            alert('Файл успешно загружен!');
            progress.value = 1; // Убедимся, что по завершении 100%
        } else {
            alert('Произошла ошибка при загрузке.');
        }
    });

    // Обрабатываем ошибку сети
    xhr.addEventListener('error', () => {
        alert('Произошла ошибка сети.');
        progress.value = 0; // Сбрасываем прогресс при ошибке
    });

    // 4. Подготавливаем и отправляем данные
    const formData = new FormData(form);

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
});
