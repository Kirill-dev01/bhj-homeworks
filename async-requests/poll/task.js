// Находим элементы для заголовка и ответов
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

// 1. Загружаем данные опроса с сервера
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

// 2. Обрабатываем полученные данные
xhr.addEventListener('load', () => {
    if (xhr.status !== 200) {
        console.error('Ошибка загрузки опроса');
        return;
    }

    try {
        const data = JSON.parse(xhr.responseText);
        const pollId = data.id;

        // 3. Отображаем заголовок опроса
        pollTitle.textContent = data.data.title;

        // 4. Создаем и отображаем кнопки с ответами
        data.data.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.classList.add('poll__answer');
            button.textContent = answer;

            // 5. Добавляем обработчик клика на каждую кнопку
            button.addEventListener('click', () => {
                // Выполняем базовое требование
                alert('Спасибо, ваш голос засчитан!');

                // --- Начало повышенного уровня сложности ---

                // 6. Отправляем POST-запрос с голосом
                const postXhr = new XMLHttpRequest();
                postXhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
                postXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                // 7. Обрабатываем ответ со статистикой
                postXhr.addEventListener('load', () => {
                    if (postXhr.status !== 200) {
                        console.error('Ошибка отправки голоса');
                        return;
                    }

                    try {
                        const statsData = JSON.parse(postXhr.responseText).stat;

                        // Считаем общее количество голосов
                        const totalVotes = statsData.reduce((sum, item) => sum + item.votes, 0);

                        // Очищаем контейнер от кнопок
                        pollAnswers.innerHTML = '';

                        // 8. Отображаем результаты голосования
                        statsData.forEach(item => {
                            // Рассчитываем проценты
                            const percentage = totalVotes > 0 ? ((item.votes / totalVotes) * 100).toFixed(2) : 0;

                            const resultHTML = `
                <div>
                  ${item.answer}: <strong>${item.votes} (${percentage}%)</strong>
                </div>
              `;
                            pollAnswers.insertAdjacentHTML('beforeend', resultHTML);
                        });
                    } catch (e) {
                        console.error('Ошибка парсинга статистики:', e);
                    }
                });

                // Отправляем данные в формате x-www-form-urlencoded
                postXhr.send(`vote=${pollId}&answer=${index}`);

            });

            pollAnswers.appendChild(button);
        });
    } catch (e) {
        console.error('Ошибка парсинга данных опроса:', e);
    }
});
