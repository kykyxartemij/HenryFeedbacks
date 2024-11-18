// Averade drage & div
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
            averageScoreDiv.innerHTML = '<h2Average score:></h2>'; // title

            // Here
            for (const [subject, average] of Object.entries(data)) {
                const p = document.createElement('p');
                p.innerText = `${subject}: ${average.toFixed(2)}`; // make it looks like x.xx
                averageScoreDiv.appendChild(p);
            }

            averageScoreDiv.style.display = 'block'; // div
        })
        .catch(err => {
            console.error('Error getting Averade score:', err);
            const averageScoreDiv = document.getElementById('database');
            averageScoreDiv.innerHTML = 'Error getting Averade score';
        });
}

window.onload = function() {
    fetchAverageScore();
};