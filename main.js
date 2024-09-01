import { quizData } from './quizData.js';

let currentQuestion = 0;
let score = 0;
let selectedLang = 'ru'; // Default language

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button");
const resultsContainer = document.getElementById("results");
const restartButton = document.getElementById("restart-button");
const languageButtons = document.querySelectorAll(".language-btn");

const textContent = {
  ru: {
    nextButton: "Следующий вопрос",
    restartButton: "Начать заново",
    results: "Вы ответили правильно на",
    resultsEnd: "вопросов.",
  },
  en: {
    nextButton: "Next Question",
    restartButton: "Restart Quiz",
    results: "You answered correctly",
    resultsEnd: "questions.",
  },
  uz: {
    nextButton: "Keyingi savol",
    restartButton: "Qayta boshlash",
    results: "Siz to'g'ri javob berdingiz",
    resultsEnd: "savolga.",
  }
};

function loadQuestion() {
  clearState();

  const currentQuizData = quizData[selectedLang][currentQuestion];
  const questionElement = document.createElement("h2");
  questionElement.innerText = currentQuizData.question;
  questionContainer.appendChild(questionElement);

  const answers = ["a", "b", "c", "d"];
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = `${answer.toUpperCase()}. ${currentQuizData[answer]}`;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    questionContainer.appendChild(button);
  });

  updateUI();
}

function clearState() {
  while (questionContainer.firstChild) {
    questionContainer.removeChild(questionContainer.firstChild);
  }
  nextButton.style.display = "none";
  resultsContainer.style.display = "none";
  restartButton.style.display = "none";
}

function selectAnswer(answer) {
  if (answer === quizData[selectedLang][currentQuestion].correct) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData[selectedLang].length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  clearState();
  resultsContainer.style.display = "block";
  resultsContainer.innerText = `${textContent[selectedLang].results} ${score} ${textContent[selectedLang].resultsEnd} ${quizData[selectedLang].length}.`;
  restartButton.style.display = "block";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  restartButton.style.display = "none";
  loadQuestion();
}

function changeLanguage(event) {
  selectedLang = event.target.getAttribute("data-lang");
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function updateUI() {
  nextButton.innerText = textContent[selectedLang].nextButton;
  restartButton.innerText = textContent[selectedLang].restartButton;
}

nextButton.addEventListener("click", () => {
  loadQuestion();
});

restartButton.addEventListener("click", restartQuiz);

languageButtons.forEach(button => {
  button.addEventListener("click", changeLanguage);
});

loadQuestion();
