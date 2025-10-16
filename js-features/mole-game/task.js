// Получаем доступ к счётчикам
const dead = document.getElementById('dead');
const lost = document.getElementById('lost');

// Функция для сброса счётчиков
const resetGame = () => {
    dead.textContent = 0;
    lost.textContent = 0;
};

// Используем цикл для назначения обработчика клика каждой лунке
for (let i = 1; i <= 9; i++) {
    // Получаем лунку по её индексу
    const hole = document.getElementById(`hole${i}`);

    // Назначаем обработчик события 'onclick'
    hole.onclick = () => {
        // Проверяем, есть ли у лунки класс 'hole_has-mole'
        if (hole.classList.contains('hole_has-mole')) {
            // Если есть (попали по кроту)
            let currentDead = parseInt(dead.textContent, 10);
            dead.textContent = ++currentDead;

            // Проверяем условие победы
            if (currentDead === 10) {
                alert('Вы победили!');
                resetGame(); // Сбрасываем игру
            }
        } else {
            // Если нет (промахнулись)
            let currentLost = parseInt(lost.textContent, 10);
            lost.textContent = ++currentLost;

            // Проверяем условие поражения
            if (currentLost === 5) {
                alert('Вы проиграли!');
                resetGame(); // Сбрасываем игру
            }
        }
    };
}