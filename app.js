const tg = window.Telegram.WebApp;
tg.expand();

// Анимации появления
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    document.querySelectorAll('.fade-in').forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('loaded');
        }, 100 * i);
    });

    // Таймер
    const timerEl = document.getElementById('timer');
    const deadline = new Date();
    deadline.setHours(22, 0, 0, 0);
    if (deadline < new Date()) deadline.setDate(deadline.getDate() + 1); // Если уже позже 22:00

    function updateTimer() {
        const now = new Date();
        const diff = deadline - now;
        if (diff <= 0) {
            timerEl.textContent = '00:00:00';
            return;
        }
        const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        timerEl.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
});
