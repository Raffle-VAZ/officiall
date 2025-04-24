document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Telegram WebApp
    Telegram.WebApp.ready();

    // Активация анимаций
    document.body.classList.add('loaded');
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.transitionDelay = `${0.2 + index * 0.1}s`;
        el.classList.add('loaded');
    });

    // Обработчики кнопок
    document.getElementById('detailsBtn').addEventListener('click', () => {
        Telegram.WebApp.showAlert('Подробная информация о розыгрыше появится позже!');
    });

    document.getElementById('otherBtn').addEventListener('click', () => {
        Telegram.WebApp.showAlert('Следите за новостями в нашем канале!');
    });

    // Таймер
    function updateTimer() {
        const endTime = new Date();
        endTime.setUTCHours(18, 0, 0, 0); // 21:00 МСК (UTC+3)

        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
            document.getElementById('timer').textContent = "00:00:00";
            return;
        }

        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        document.getElementById('timer').textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});