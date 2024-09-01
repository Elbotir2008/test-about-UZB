const questions = [
    {
        question: 'Укажите город, который был объявлен столицей государства Амира Темура.',
        options: ['A) Самарканд', 'B) Бухара', 'C) Кеш', 'D) Шаш'],
        correctAnswer: 'A'
    },
    {
        question: 'Определите поселение на территории Узбекистана, в планировке которого прослеживаются первые признаки города.',
        options: ['A) Джаркутан', 'B) Обишир', 'C) Селенгур', 'D) Кульбулак'],
        correctAnswer: 'A'
    }
    // Qolgan savollarni ham qo'shing
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-button');
const resultsContainer = document.getElementById('results');

function showQuestion() {
    questionContainer.innerHTML = '';
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.createElement('p');
    questionElement.textContent = currentQuestion.question;
    questionContainer.appendChild(questionElement);

    currentQuestion.options.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="answer" value="${option.charAt(0)}"> ${option}`;
        questionContainer.appendChild(label);
    });
}

function showNextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Пожалуйста, выберите ответ.');
        return;
    }

    const answer = selectedOption.value;
    if (answer === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.innerHTML = '';
    nextButton.style.display = 'none';
    resultsContainer.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов. Неправильных ответов: ${questions.length - score}.`;
}

nextButton.addEventListener('click', showNextQuestion);

showQuestion();
