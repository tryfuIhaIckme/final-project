async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading questions:', error);
        return null;
    }
}

async function initSurvey() {
    const data = await loadQuestions();
    if (!data) {
        alert('Не удалось загрузить вопросы. Пожалуйста, попробуйте позже.');
        return;
    }

    const questionsContainer = document.getElementById('questions-container');
    const questions = data.questions;
    const ratings = data.ratings;

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionLabel = document.createElement('label');
        questionLabel.textContent = question;
        questionDiv.appendChild(questionLabel);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        ratings.forEach((rating, ratingIndex) => {
            const ratingLabel = document.createElement('label');
            ratingLabel.textContent = rating;

            const ratingInput = document.createElement('input');
            ratingInput.type = 'radio';
            ratingInput.name = `q${index}`;
            ratingInput.value = ratingIndex + 1;

            ratingLabel.insertBefore(ratingInput, ratingLabel.firstChild);
            optionsDiv.appendChild(ratingLabel);
        });

        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    });
}

document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const questions = document.querySelectorAll('.question');
    let unsatisfied = false;

    questions.forEach(question => {
        const selectedRating = question.querySelector('input[type="radio"]:checked');
        if (selectedRating && selectedRating.value <= 2) {
            unsatisfied = true;
        }
    });

    if (unsatisfied) {
        document.getElementById('discount-notification').classList.remove('hidden');
    } else {
        alert('Спасибо за ваш отзыв!');
    }
});

initSurvey();


function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

document.getElementById('bubu').addEventListener('click', function(event) {
    event.preventDefault();
    toggleTheme();
});

applySavedTheme();