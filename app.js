// Premenné pre ukladanie časov pre jednotlivé aktivity
let workTime = 0;
let studyTime = 0;
let houseworkTime = 0;
let dogWalkingTime = 0;

// Časovače pre jednotlivé aktivity
let workTimer = null;
let studyTimer = null;
let houseworkTimer = null;
let dogWalkingTimer = null;

// Funkcia na nastavenie dátumu a zobrazenie dňa v týždni
function updateDate() {
    const dateInput = document.getElementById('date');
    const date = new Date(dateInput.value);
    const dayOfWeek = date.toLocaleString('sk-SK', { weekday: 'long' });

    document.getElementById('dayOfWeek').textContent = `Dnes je ${dayOfWeek}`;
}

// Funkcia na spustenie/zastavenie časovača
function startStopTimer(activity) {
    let timer = null;
    let currentTime = 0;
    let timeDisplay = null;

    if (activity === 'work') {
        timer = workTimer;
        currentTime = workTime;
        timeDisplay = document.getElementById('workTime');
    } else if (activity === 'study') {
        timer = studyTimer;
        currentTime = studyTime;
        timeDisplay = document.getElementById('studyTime');
    } else if (activity === 'housework') {
        timer = houseworkTimer;
        currentTime = houseworkTime;
        timeDisplay = document.getElementById('houseworkTime');
    } else if (activity === 'dogWalking') {
        timer = dogWalkingTimer;
        currentTime = dogWalkingTime;
        timeDisplay = document.getElementById('dogWalkingTime');
    }

    // Spusti alebo zastav časovač
    if (timer === null) {
        timer = setInterval(function () {
            currentTime++;
            let minutes = Math.floor(currentTime / 60);
            let seconds = currentTime % 60;
            timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000);
    } else {
        clearInterval(timer);
        timer = null;
    }

    // Uložíme čas pre danú aktivitu
    if (activity === 'work') workTime = currentTime;
    else if (activity === 'study') studyTime = currentTime;
    else if (activity === 'housework') houseworkTime = currentTime;
    else if (activity === 'dogWalking') dogWalkingTime = currentTime;
}

// Funkcia na zmenu jazyka
function changeLanguage() {
    const language = document.getElementById('language').value;

    fetch(`languages/${language}.json`)
        .then(response => response.json())
        .then(data => updateText(data));
}

// Funkcia na aktualizáciu textu na stránke podľa zvoleného jazyka
function updateText(data) {
    document.querySelector('h1').textContent = data.header;
    document.querySelector('label[for="work"]').textContent = data.activities.work;
    document.querySelector('label[for="study"]').textContent = data.activities.study;
    document.querySelector('label[for="housework"]').textContent = data.activities.housework;
    document.querySelector('label[for="dogWalking"]').textContent = data.activities.dogWalking;
    document.querySelector('footer p').textContent = data.footer;
}

// Funkcia na vykreslenie grafu š
