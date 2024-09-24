// buttons
const botaoDescanso = document.querySelector("#opcao-descanso");
const botaoPomodoro = document.querySelector("#opcao-pomodoro");
const formOpcao = document.querySelector("#formulario");
const acao1 = document.querySelector("#botao-acao1");
const acao2 = document.querySelector("#botao-acao2");

// texts
const contagemPomodoros = document.querySelector("#contagem-pomodoros");
const contagemDescansos = document.querySelector("#contagem-descansos");
const minutoDisplay = document.querySelector("#cont-minuto");
const segundoDisplay = document.querySelector("#cont-segundo");
const configText = document.querySelector("#config-text");

// inputs 
const inputSegundos = document.querySelector("#segundos");
const inputMinutos = document.querySelector("#minutos");

// logic
let isRunning = false;
let isPaused = false;
let segundos = 0;
let minutos = 0;
let intervalId;

acao1.addEventListener("click", () => {
    if (isRunning) {
        stop();
    } else if (isPaused) {
        stop()
        isPaused = false;
    } else {
        start();
        resetButtonsStart();
    }
});

acao2.addEventListener("click", () => {
    if (isRunning) {
        pause();
    } else if (isPaused) {
        resume();
    }
});

botaoDescanso.addEventListener("click", () => {
    botaoPomodoro.classList.remove("selected");
    botaoDescanso.classList.add("selected");
    configText.innerText = "DESCANSO";
    resetAll();
});

botaoPomodoro.addEventListener("click", () => {
    botaoDescanso.classList.remove("selected");
    botaoPomodoro.classList.add("selected");
    configText.innerText = "POMODORO";
    resetAll();
});

function start() {
    if (!isRunning) {
        if (!isPaused) {
            segundos = parseInt(inputSegundos.value) || 0;
            minutos = parseInt(inputMinutos.value) || 0;
            update();
        }

        isRunning = true;
        isPaused = false;

        intervalId = setInterval(timer, 1000);
    }
}

function stop() {
    isRunning = false;
    clearInterval(intervalId);
    resetButtonsStop();
    resetAll();
}

function pause() {
    isRunning = false; 
    clearInterval(intervalId);
    isPaused = true; 
    setButtonsPause();
}

function resume() {
    if (isPaused) {
        isRunning = true; 
        isPaused = false;
        intervalId = setInterval(timer, 1000);
        resetButtonsStart();
    }
}

formOpcao.addEventListener("submit", (event) => {
    event.preventDefault();
    if (isRunning) {
        return; 
    }

    segundos = Math.max(0, parseInt(inputSegundos.value) || 0);
    minutos = Math.max(0, parseInt(inputMinutos.value) || 0);
    update();
});

function timer() {
    if (minutos === 0 && segundos === 0) {
        stop();
        return;
    }

    segundos -= 1;
    if (segundos < 0) {
        segundos = 59;
        minutos -= 1;
    }
    update();
}

function update() {
    segundoDisplay.innerText = String(segundos).padStart(2, '0');
    minutoDisplay.innerText = String(minutos).padStart(2, '0');
}

function resetAll() {
    inputSegundos.value = 0;
    inputMinutos.value = 0;
    minutos = 0;
    segundos = 0;
    update();
}

function resetButtonsStop() {
    acao2.style.display = "none";
    acao1.innerText = "START";
}

function resetButtonsStart() {
    acao1.innerText = "STOP";
    acao2.style.display = "block";
}

function setButtonsPause() {
    acao1.innerText = "RESET";
    acao2.innerText = "RESUME";
}
