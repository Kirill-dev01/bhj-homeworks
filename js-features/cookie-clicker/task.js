// Находим обязательные элементы на странице
const cookie = document.getElementById('cookie');
const clickerCounter = document.getElementById('clicker__counter');

// Находим необязательный элемент для скорости клика.
// Если его нет, clickerSpeed будет null, и это нормально.
const clickerSpeed = document.getElementById('clicker__speed');

// Исходные размеры печеньки
const initialWidth = cookie.width;
const initialHeight = cookie.height;

// Переменная для чередования размера
let isIncreased = false;

// Переменная для хранения времени последнего клика
let lastClickTime = null;

cookie.onclick = () => {
    // 1. Увеличиваем счётчик кликов
    let currentClicks = parseInt(clickerCounter.textContent, 10);
    clickerCounter.textContent = ++currentClicks;

    // 2. Чередуем размер печеньки
    if (isIncreased) {
        // Возвращаем исходный размер
        cookie.width = initialWidth;
        cookie.height = initialHeight;
    } else {
        // Увеличиваем размер (например, на 20 пикселей)
        cookie.width = initialWidth + 20;
        cookie.height = initialHeight + 20;
    }
    // Инвертируем флаг для следующего клика
    isIncreased = !isIncreased;

    // --- Повышенный уровень сложности (с проверкой) ---
    // Этот блок будет работать, только если элемент clicker__speed существует
    if (clickerSpeed) {
        const currentTime = new Date();

        if (lastClickTime) {
            // Рассчитываем разницу во времени в секундах
            const timeDifference = (currentTime - lastClickTime) / 1000;

            // Рассчитываем скорость: 1 клик / разница во времени
            const speed = 1 / timeDifference;

            // Обновляем текст на странице, округляя до двух знаков после запятой
            clickerSpeed.textContent = speed.toFixed(2);
        }

        // Обновляем время последнего клика
        lastClickTime = currentTime;
    }
};