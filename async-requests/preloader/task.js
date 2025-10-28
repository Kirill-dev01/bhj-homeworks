// Находим ключевые элементы на странице
const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');
const storageKey = 'currencyCache'; // Ключ для localStorage

/**
 * Отрисовывает список валют в контейнере.
 * @param {Object} valutes - Объект с данными о валютах (из response.Valute).
 */
const renderValutes = (valutes) => {
    // Очищаем контейнер от предыдущих данных
    itemsContainer.innerHTML = '';

    // Перебираем объект valutes и создаем HTML для каждого элемента
    Object.values(valutes).forEach(valute => {
        const itemHTML = `
      <div class="item">
        <div class="item__code">${valute.CharCode}</div>
        <div class="item__value">${valute.Value}</div>
        <div class="item__currency">руб.</div>
      </div>
    `;
        // Добавляем HTML нового элемента в конец контейнера
        itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
};

// --- Повышенный уровень сложности (Кэширование) ---
// 1. Попробовать загрузить и отобразить данные из кэша при загрузке страницы
try {
    const cachedData = localStorage.getItem(storageKey);
    if (cachedData) {
        const valutes = JSON.parse(cachedData);
        renderValutes(valutes); // Отображаем кэш
    }
} catch (e) {
    console.error("Ошибка парсинга кэша:", e);
    localStorage.removeItem(storageKey); // Очищаем некорректные данные
}

// --- Основное задание ---
// 2. В любом случае (даже если есть кэш) отправляем запрос на сервер
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send();

// 3. Обрабатываем ответ от сервера
xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
        try {
            // Запрос успешен, парсим JSON
            const data = JSON.parse(xhr.responseText);
            const valutes = data.response.Valute;

            // Отображаем свежие данные (заменяя кэш)
            renderValutes(valutes);

            // --- Повышенный уровень сложности ---
            // Сохраняем свежие данные в localStorage
            localStorage.setItem(storageKey, JSON.stringify(valutes));

        } catch (e) {
            console.error("Ошибка парсинга ответа сервера:", e);
            // Здесь можно вывести сообщение об ошибке пользователю
        }
    } else {
        console.error(`Ошибка запроса: ${xhr.status}`);
        // Здесь также можно вывести сообщение об ошибке
    }

    // 4. Прячем анимацию загрузки (в любом случае: успех или ошибка)
    loader.classList.remove('loader_active');
});
