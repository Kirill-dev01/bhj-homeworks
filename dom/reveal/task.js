// Находим все элементы, которые должны появляться при прокрутке
const revealElements = document.querySelectorAll('.reveal');

// Функция, которая проверяет видимость элемента
const isVisible = (element) => {
    // getBoundingClientRect() возвращает размер элемента и его позицию относительно окна
    const { top, bottom } = element.getBoundingClientRect();

    // Если верхняя граница элемента выше нижней границы окна И
    // нижняя граница элемента ниже верхней границы окна, то элемент в поле зрения
    if (top < window.innerHeight && bottom > 0) {
        return true;
    }
    return false;
};

// Функция-обработчик события прокрутки
const handleScroll = () => {
    revealElements.forEach(element => {
        // Если элемент видим, добавляем ему активный класс
        if (isVisible(element)) {
            element.classList.add('reveal_active');
        }
    });
};

// Добавляем "слушателя" на событие прокрутки окна
window.addEventListener('scroll', handleScroll);

// Вызываем функцию один раз при загрузке страницы,
// чтобы проверить элементы, которые уже находятся в видимой области
handleScroll();