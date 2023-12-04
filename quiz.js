// Load JSON data
const jsonData = {
    "quizTitle": "General Knowledge Quiz",
    "questions": [
        {
            "question": "What is ABC?",
            "image": "https://example.com/images/question1.jpg",
            "subtitle": "Choose the correct option",
            "A": "Option A",
            "B": "Option B",
            "C": "Option C",
            "D": "Option D",
            "Answer": "D"
        },
        {
            "question": "Which city is known as the 'City of Love'?",
            "image": "https://example.com/images/question2.jpg",
            "subtitle": "Select the right answer",
            "A": "Paris",
            "B": "Rome",
            "C": "Venice",
            "D": "Barcelona",
            "Answer": "A"
        },
        {
            "question": "What is the capital of Japan?",
            "image": "https://example.com/images/question3.jpg",
            "subtitle": "Pick the correct capital",
            "A": "Beijing",
            "B": "Seoul",
            "C": "Tokyo",
            "D": "Bangkok",
            "Answer": "C"
        }
        // Add more questions as needed
    ]
};

// Set quiz title
document.querySelector('.title').innerText = jsonData.quizTitle;

// Load questions from JSON file
const quizData = jsonData.questions;
let currentQuestion = 0;
const totalQuestions = quizData.length;
let timer;

function loadQuestion() {
    const currentQuestionData = quizData[currentQuestion];
    const questionContent = document.querySelector('.question-content');
    const imageElement = document.createElement('img');
    
    document.querySelector('.question-number').innerText = `Question ${currentQuestion + 1}`;
    document.querySelector('.timer').innerText = 'Time: 00:00'; // Reset timer for each question

    // Hide the answer div when loading a new question
    document.getElementById('answer').style.display = 'none';

    // Display image if available
    if (currentQuestionData.image) {
        imageElement.src = currentQuestionData.image;
        imageElement.alt = `Image for Question ${currentQuestion + 1}`;
        questionContent.innerHTML = ''; // Clear existing content
        questionContent.appendChild(imageElement);
    } else {
        questionContent.innerHTML = ''; // Clear existing content
    }

    // Display other question content
    questionContent.innerHTML += `
        <p>${currentQuestionData.question}</p>
        <p>${currentQuestionData.subtitle}</p>
        <label><input type="radio" name="option" class="radio" value="A">${currentQuestionData.A}</label><br>
        <label><input type="radio" name="option" class="radio" value="B">${currentQuestionData.B}</label><br>
        <label><input type="radio" name="option" class="radio" value="C">${currentQuestionData.C}</label><br>
        <label><input type="radio" name="option" class="radio" value="D">${currentQuestionData.D}</label><br>
    `;

    document.querySelector('.answer').innerText= `Answer: ${currentQuestionData.Answer}`;
}

function nextQuestion() {
    // Hide the answer div when moving to the next question
    document.getElementById('answer').style.display = 'none';

    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        loadQuestion();
    } else {
        alert('MCQ Completed!');
        // You can redirect or perform any other action here
    }
}

function previousQuestion() {
    currentQuestion--;
    if (currentQuestion >= 0) {
        loadQuestion();
    } else {
        // Handle case when trying to go back from the first question
        alert('This is the first question');
        currentQuestion = 0;
    }
}

function showAnswer() {
    const answerDiv = document.getElementById('answer');
    answerDiv.style.display = answerDiv.style.display === 'none' ? 'block' : 'none';
}

// Call loadQuestion to initialize the first question
loadQuestion();

// You can add timer logic as per your requirement
// Example: Start a timer and update the display every second
timer = setInterval(updateTimer, 1000);
let seconds = 0;

function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timer').innerText = `Time: ${formatTime(minutes)}:${formatTime(remainingSeconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
