// Находим все выпадающие списки на странице
const dropdowns = document.querySelectorAll('.dropdown');

// Перебираем каждый найденный список, чтобы назначить ему обработчики
dropdowns.forEach(dropdown => {
    // Находим элементы внутри текущего списка: кнопку и само меню
    const valueElement = dropdown.querySelector('.dropdown__value');
    const listElement = dropdown.querySelector('.dropdown__list');

    // 1. Сворачивание/разворачивание списка по клику на кнопку
    valueElement.addEventListener('click', () => {
        listElement.classList.toggle('dropdown__list_active');
    });

    // Находим все пункты в текущем меню
    const items = dropdown.querySelectorAll('.dropdown__item');

    // Перебираем все пункты меню, чтобы назначить им обработчик клика
    items.forEach(item => {
        item.addEventListener('click', (event) => {
            // 3. Запрещаем переход по ссылке
            event.preventDefault();

            // 2. Устанавливаем новое значение в кнопку
            valueElement.textContent = item.querySelector('.dropdown__link').textContent;

            // 2. Закрываем список
            listElement.classList.remove('dropdown__list_active');
        });
    });
});