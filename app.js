document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация Telegram WebApp
    Telegram.WebApp.ready();
    Telegram.WebApp.expand(); // Раскрываем на весь экран

    // 2. Активация анимаций появления элементов
    document.body.classList.add('loaded');
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.transitionDelay = `${0.1 + index * 0.15}s`;
        el.classList.add('loaded');
    });

    // 3. Обработчики кнопок
    const setupButtons = () => {
        document.getElementById('detailsBtn').addEventListener('click', () => {
            Telegram.WebApp.showAlert('🎉 Розыгрыш 5000₽\n\nДата окончания: 25.12.2023\nУчастники: все подписчики канала');
        });

        document.getElementById('otherBtn').addEventListener('click', () => {
            Telegram.WebApp.openTelegramLink('https://t.me/your_channel'); // Укажите свой канал
        });
    };

    // 4. Бесконечная анимация гифки
    const setupAnimation = () => {
        const popper = document.getElementById('partyPopper');
        popper.src = 'img/Party Popper.webp?' + Date.now(); // Добавляем timestamp для избежания кеширования

        // Альтернативный вариант с перезагрузкой каждые 2 секунды (если гифка не зациклена)
        // setInterval(() => {
        //     popper.src = 'img/Party Popper.webp?' + Date.now();
        // }, 2000);
    };

    // 5. Точный таймер для Москвы
    const updateTimer = () => {
        const now = new Date();
        const mskOffset = 3 * 3600000; // MSK (UTC+3)
        const mskTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + mskOffset);

        let endTime = new Date(mskTime);
        endTime.setHours(21, 0, 0, 0); // 21:00 МСК

        // Если время уже прошло - устанавливаем на завтра
        if (mskTime > endTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const diff = endTime - mskTime;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        document.getElementById('timer').textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        requestAnimationFrame(updateTimer);
    };

    // Инициализация всех функций
    setupButtons();
    setupAnimation();
    updateTimer();

    // Оптимизация для мобильных устройств
    document.body.style.webkitTapHighlightColor = 'transparent';
    document.body.style.touchAction = 'manipulation';
});