// Находим главный элемент книги
const book = document.getElementById('book');

// --- УПРАВЛЕНИЕ РАЗМЕРОМ ШРИФТА ---

// Находим все кнопки для смены размера шрифта
const fontSizeControls = document.querySelectorAll('.font-size');

fontSizeControls.forEach(control => {
    control.addEventListener('click', (event) => {
        // 1. Отменяем стандартное поведение ссылки
        event.preventDefault();

        // 2. Убираем активный класс со всех кнопок размера
        const currentActive = document.querySelector('.font-size_active');
        if (currentActive) {
            currentActive.classList.remove('font-size_active');
        }

        // 3. Добавляем активный класс нажатой кнопке
        control.classList.add('font-size_active');

        // 4. Убираем все классы размера шрифта с книги
        book.classList.remove('book_fs-big', 'book_fs-small');

        // 5. Добавляем нужный класс размера шрифта, если он есть
        const size = control.dataset.size;
        if (size) {
            book.classList.add(`book_fs-${size}`);
        }
    });
});


// --- УПРАВЛЕНИЕ ЦВЕТОМ ТЕКСТА И ФОНА (ПОВЫШЕННЫЙ УРОВЕНЬ) ---

// Функция-помощник для управления классами
const createControlHandler = (controlSelector, bookClassPrefix, dataAttribute) => {
    const controls = document.querySelectorAll(controlSelector);

    controls.forEach(control => {
        control.addEventListener('click', (event) => {
            event.preventDefault();

            // Убираем активный класс у текущего активного контрола
            const currentActive = document.querySelector(`${controlSelector}.color_active`);
            if (currentActive) {
                currentActive.classList.remove('color_active');
            }

            // Добавляем активный класс нажатому
            control.classList.add('color_active');

            // Удаляем все классы этого типа с книги
            book.className.split(' ').forEach(cls => {
                if (cls.startsWith(bookClassPrefix)) {
                    book.classList.remove(cls);
                }
            });

            // Добавляем новый класс, если есть значение в data-атрибуте
            const value = control.dataset[dataAttribute];
            if (value) {
                book.classList.add(`${bookClassPrefix}${value}`);
            }
        });
    });
};

// Инициализируем обработчики для цвета текста и фона
createControlHandler('.book__control_color .color', 'book_color-', 'textColor');
createControlHandler('.book__control_background .color', 'book_bg-', 'bgColor');