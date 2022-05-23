let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/right.mp3');
let AUDIO_FAIL = new Audio('audio/wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questionsCSS.length;
    document.getElementById('css-link').style = 'color: #ba3228; background-color: #ffffffa6; border-left: 6px solid white';

    showElements();
}


function showElements() {
    let question = questionsCSS[currentQuestion];

    if (gameIsOver()) {      // wenn die letze Frage erreicht wurde
        showEndScreen();
    } else {
        updateProgressBar();
        loadQuestionAndAnswer();
    }
}


function gameIsOver() {
    return currentQuestion >= questionsCSS.length;
}


function showEndScreen() {
    document.getElementById('end-screen').style = '';   // Das Style-Tag "display-none" wird entfernt und durch nichts ersetzt 
    document.getElementById('question-body').style = 'display: none';

    document.getElementById('amount-of-questions').innerHTML = questionsCSS.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-img').src = 'img/end.png';
    document.getElementById('progress-bar').innerHTML = `100%`;
    document.getElementById('progress-bar').style.width = `100%`;
}


function updateProgressBar() {
    let percent = currentQuestion / questionsCSS.length;     // Berechnung der Prozentzahl für eine Frage
    percent = Math.round(percent * 100);        // Math.round - Zahlrundung
    document.getElementById('progress-bar').innerHTML = `${percent} %`;     // Prozentprogress in die Bar einfügen
    document.getElementById('progress-bar').style.width = `${percent}%`;   // Breite der Bar je nach Prozentfortschritt
}


function loadQuestionAndAnswer() {
    let question = questionsCSS[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;     //currentQuestion fängt bei 0 an => daher +1, um die richtige Questions-Number 
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection) {
    let question = questionsCSS[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);   // Es wird auf die Nummer des Arrays zugegriffen
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {       // Richtige Frage beantwortet
        document.getElementById(selection).parentNode.classList.add('bg-success');  // .parentNode - die Klasse wird dem übergeordnetem Element gegeben
        AUDIO_SUCCESS.play();
        rightQuestions++;       // wenn eine Frage richtig beantwortet wurde, wird sich das Ergebnis von rightQuestions um 1 erhöhen
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;    // Attribut disable wird aus der ID next-button entfernt, wenn die Funktion ausgeführt wurde
}


function rightAnswerSelected(selectedQuestionNumber) {
    let question = questionsCSS[currentQuestion];
    return selectedQuestionNumber == question['right_answer'];
}


function nextQuestion() {
    currentQuestion++;  // der Wert von currentQuestion (Zeile 48: let currentQuestion = 0;) wird z.B. von 0 auf 1 erhöht
    document.getElementById('next-button').disabled = true;     // Das Attribut disable wird dem Next-Button hinzugefügt 
    resetAnswerButtons();   // Die Color-Klassen werden entfernt
    showElements();     // Neue Frage und Antworten werden geladen
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {        // Spiel neu laden
    document.getElementById('header-img').src = 'img/quiz-bg.jpg';
    document.getElementById('end-screen').style = 'display: none';      // Endscreem ausblendet
    document.getElementById('question-body').style = '';        // Question-Body wieder einfügen

    currentQuestion = 0;        // Der alte Wert der Variable wird überschrieben => auf 0 gesetzt
    rightQuestions = 0;

    init();
}


// Responsive Menu
function showMenu() {
    document.getElementById('menu').classList.add('show-menu');
    document.getElementById('menu').classList.remove('display-none');
  }
  
  function hideMenu() {
    document.getElementById('menu').classList.remove('show-menu');
    document.getElementById('menu').classList.add('display-none');
  }