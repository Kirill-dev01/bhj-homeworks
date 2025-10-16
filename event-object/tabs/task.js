// Находим все контейнеры с вкладками на странице
const tabContainers = document.querySelectorAll('.tabs');

// Перебираем каждый контейнер, чтобы инициализировать его
tabContainers.forEach(container => {
    // Находим все переключатели и контентные блоки внутри ТЕКУЩЕГО контейнера
    const tabs = Array.from(container.querySelectorAll('.tab'));
    const contents = Array.from(container.querySelectorAll('.tab__content'));

    // Добавляем обработчик клика на каждый переключатель
    tabs.forEach(clickedTab => {
        clickedTab.addEventListener('click', () => {
            // 1. Определяем индекс вкладки, по которой кликнули
            const index = tabs.indexOf(clickedTab);

            // 2. Убираем активные классы у всех вкладок и контента
            tabs.forEach(tab => tab.classList.remove('tab_active'));
            contents.forEach(content => content.classList.remove('tab__content_active'));

            // 3. Добавляем активный класс нужной вкладке и её контенту
            clickedTab.classList.add('tab_active');
            contents[index].classList.add('tab__content_active');
        });
    });
});