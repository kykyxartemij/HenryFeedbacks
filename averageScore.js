// Функция для получения средней оценки и отображения её в div
function fetchAverageScore() {
    fetch('/average-feedback')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            const averageScoreDiv = document.getElementById('database');
            averageScoreDiv.innerHTML = '<h2>Средние оценки:</h2>'; // Заголовок

            // Обходим все предметы и их средние оценки
            for (const [subject, average] of Object.entries(data)) {
                const p = document.createElement('p');
                p.innerText = `${subject}: ${average.toFixed(2)}`; // Форматируем до двух знаков после запятой
                averageScoreDiv.appendChild(p);
            }

            averageScoreDiv.style.display = 'block'; // Показываем div
        })
        .catch(err => {
            console.error('Ошибка при получении средней оценки:', err);
            const averageScoreDiv = document.getElementById('database');
            averageScoreDiv.innerHTML = 'Ошибка при получении средней оценки';
        });
}

// Вызываем функцию, когда страница загружается
window.onload = function() {
    fetchAverageScore();
};