// Находим все контейнеры-ротаторы на странице
const rotators = document.querySelectorAll('.rotator');

// Обрабатываем каждый ротатор независимо
rotators.forEach(rotator => {
    // Находим все "кейсы" (отдельные фразы) внутри текущего ротатора
    const cases = rotator.querySelectorAll('.rotator__case');
    let currentIndex = 0; // Начинаем с первого элемента

    // Функция, отвечающая за один шаг ротации
    const advance = () => {
        // Убираем активный класс с текущего элемента
        cases[currentIndex].classList.remove('rotator__case_active');

        // Вычисляем индекс следующего элемента, создавая бесконечный цикл
        currentIndex = (currentIndex + 1) % cases.length;

        // Получаем следующий элемент
        const nextCase = cases[currentIndex];

        // Получаем его скорость и цвет из data-атрибутов
        // Если атрибуты не заданы, используем значения по умолчанию
        const speed = nextCase.dataset.speed || 1000;
        const color = nextCase.dataset.color || 'black';

        // Делаем следующий элемент активным и применяем к нему цвет
        nextCase.classList.add('rotator__case_active');
        nextCase.style.color = color;

        // Планируем следующий вызов этой же функции через заданный интервал
        setTimeout(advance, speed);
    };

    // Запускаем ротацию
    advance();
});