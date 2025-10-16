const timerElement = document.getElementById('timer');
let totalSeconds = parseInt(timerElement.textContent, 10);

// Функция для форматирования времени (hh:mm:ss)
const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(secs).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

// Функция для скачивания файла
const downloadFile = () => {
    // Создаем невидимую ссылку
    const link = document.createElement('a');
    link.style.display = 'none';

    // Указываем путь к файлу (может быть любой) и атрибут download
    link.href = 'https://example.com/somefile.zip'; // Замените на реальную ссылку
    link.setAttribute('download', 'prize.zip'); // Имя файла для сохранения

    document.body.appendChild(link);
    link.click();

    // Удаляем ссылку со страницы после клика
    document.body.removeChild(link);
};


const countdown = setInterval(() => {
    if (totalSeconds <= 0) {
        clearInterval(countdown);
        alert('Вы победили в конкурсе!');
        downloadFile(); // Запускаем загрузку файла
    } else {
        timerElement.textContent = formatTime(totalSeconds);
        totalSeconds--;
    }
}, 1000);
