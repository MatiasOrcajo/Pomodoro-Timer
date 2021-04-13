const showBreakNoti = () => {
    if (window.Notification && Notification.permission === "granted") {
        document.getElementById("timbre").play()
        spawnNotifications("Terminaste tu descanso, vamos por otro pomodoro. Hacé click en 'empezar pomodoro' para iniciar el contador")

    }
}

// establecemos formato de tiempo

const formatBreakTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    // MM:SS
    return `${minutes}:${seconds}`;
}

// establecemos el contador de pomodoro

let breakTimeLimit = 300;
let breakTimePassed = 0;
let breakTimeLeft = breakTimeLimit;
let breakCount = 0;




const breakStartTimer = () => {
    const breakColorContainer = document.getElementById('breakColorContainer').classList.replace('orange-color', 'green-color')

    timerInterval = setInterval(() => {
        breakTimePassed = breakTimePassed += 1;
        breakTimeLeft = breakTimeLimit - breakTimePassed;
        document.getElementById("break-base-timer-label").innerHTML = formatBreakTimeLeft(breakTimeLeft);

    }, 1000);
}

// llamamos al boton de descanso e invocamos la funcion
const startBreak = document.getElementById('startBreak');
startBreak.addEventListener('click', () => {
    startPomodoro.disabled = true
    startBreak.disabled = true
    setTimeout(() => {
        startPomodoro.disabled = false
        startBreak.disabled = false

        // hacemos uso del contador de pomodoros, luego habrá que hacer un forEach por cada elemento
        breakCount++
        const breakColorContainer = document.getElementById('breakColorContainer')
        clearInterval(timerInterval);
        // hay que resetear breakTimePassed para que el contador, al ser otra vez llamada la funcion, no empiece desde su valor antiguo
        breakTimePassed = 0
            // time left va a valer lo que valga breakTimeLimit
        breakTimeLeft = 300;
        // aca se puede pasar tambien breakTimeLimit
        const baseTimerLabel = document.getElementById('break-base-timer-label').textContent = `${formatBreakTimeLeft(breakTimeLeft)}`
            // cambiamos el color 
        breakColorContainer.classList.replace('green-color', 'orange-color');
        // mostramos notificacion
        showBreakNoti()
        const breakCounter = document.getElementById('breakCounter').innerHTML = `${breakCount}`
    }, 300000)

    breakStartTimer();
})

// HTML descanso
let app2 = document.getElementById("app2").innerHTML = `
<div class="base-timer">
  <span id="break-base-timer-label" class="base-timer__label">
    ${formatBreakTimeLeft(breakTimeLeft)}
    </span>
    <h2>Descansos tomados en esta sesión:</h2>
    <div class="span-flex">
        <div class="counter" id="breakCounter">
        
        </div>
  </div>
</div>`