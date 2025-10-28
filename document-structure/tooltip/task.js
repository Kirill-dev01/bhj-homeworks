// Находим все элементы, у которых должна быть подсказка
const elements = document.querySelectorAll('.has-tooltip');

// Перебираем все найденные элементы
elements.forEach(element => {
    // Создаем элемент подсказки
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = element.title;

    // Добавляем обработчик клика на каждый элемент
    element.addEventListener('click', (event) => {
        // 1. Отменяем стандартное поведение ссылки
        event.preventDefault();

        // 2. (Повышенный уровень #1) 
        // Ищем УЖЕ активную подсказку
        const activeTooltip = document.querySelector('.tooltip_active');

        // Если активная подсказка есть...
        if (activeTooltip) {
            //...и она принадлежит ЭТОМУ ЖЕ элементу, то просто удаляем ее и выходим
            if (activeTooltip === tooltip) {
                tooltip.classList.remove('tooltip_active');
                // Удаляем из DOM, чтобы не накапливались невидимые элементы
                if (tooltip.parentElement) {
                    tooltip.parentElement.removeChild(tooltip);
                }
                return;
            }

            // ...а если она принадлежит ДРУГОМУ элементу, удаляем ее
            activeTooltip.classList.remove('tooltip_active');
            if (activeTooltip.parentElement) {
                activeTooltip.parentElement.removeChild(activeTooltip);
            }
        }

        // 3. Добавляем нашу подсказку в DOM и активируем ее
        document.body.appendChild(tooltip);
        tooltip.classList.add('tooltip_active');

        // 4. (Повышенный уровень #2) Позиционирование
        const rect = element.getBoundingClientRect(); // Координаты элемента

        // Получаем желаемую позицию из data-атрибута или 'bottom' по умолчанию
        const position = element.dataset.position || 'bottom';

        // Рассчитываем позицию
        switch (position) {
            case 'top':
                tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
                break;
            case 'left':
                tooltip.style.left = `${rect.left - tooltip.offsetWidth - 5}px`;
                tooltip.style.top = `${rect.top + (rect.height - tooltip.offsetHeight) / 2}px`;
                break;
            case 'right':
                tooltip.style.left = `${rect.right + 5}px`;
                tooltip.style.top = `${rect.top + (rect.height - tooltip.offsetHeight) / 2}px`;
                break;
            default:
                tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
                tooltip.style.top = `${rect.bottom + 5}px`;
                break;
        }
    });
});
