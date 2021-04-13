// creamos el sistema de notificaciones

// activando notificaciones

window.addEventListener('load', function() {
    // Primero, comprobamos si tenemos permiso para lanzar notificaciones
    // Si no lo tenemos, lo pedimos
    if (window.Notification && Notification.permission !== "granted") {
        Notification.requestPermission(function(status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }
})

// se crea la notificacion con el mensaje customizable

const spawnNotifications = (body) => {
    let options = {
        body: body,
        icon: './descarga.png',
    }
    let n = new Notification('Pomodoro Timer dice:', options)
}

// aca llamamos a spawnNotifications con el mensaje que queremos escribir, y esta funcion, a su vez, es llamada en startTimer

const showPomodoroNoti = () => {
    if (window.Notification && Notification.permission === "granted") {
        document.getElementById("timbre").play()
        spawnNotifications("Excelente, terminaste tu pomodoro y es tiempo de descansar. Hacé click en 'empezar descanso' para iniciar el contador")

    }
}


// TERMINAN NOTIFICACIONES


// OBTENIENDO EL HORARIO DEL FINAL DEL POMODORO
// Hay que hacer push al array en la funcion donde invocamos ésta, al final del pomodoro solo habrá que pasarle la posición del array en donde se encuentra el horario, que va a coincidir con el valor del contador de pomodoros completados(proximo a hacerlo) -1

const time = [];
const getTime = () => {
    const timeElapsed = Date.now();
    const hours = new Date(timeElapsed).getHours();
    const minutes = new Date(timeElapsed).getMinutes();
    if (minutes.toString().length == 1) {
        return fullTime = `${hours}:0${minutes}`
    } else {
        return fullTime = `${hours}:${minutes}`
    }
}

// establecemos formato de tiempo

const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    // MM:SS
    return `${minutes}:${seconds}`;
}

// establecemos el contador de pomodoro

let timeLimit = 1500;
let timePassed = 0;
let timeLeft = timeLimit;
let count = 0;




const startTimer = () => {
    const pomodoroColorContainer = document.getElementById('pomodoroColorContainer').classList.replace('orange-color', 'green-color')

    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = timeLimit - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTimeLeft(timeLeft);

    }, 1000);
    stopInterval = setTimeout(() => {
        if (timePassed == 1500) {
            // hacemos uso del contador de pomodoros, luego habrá que hacer un forEach por cada elemento
            count++
            const pomodoroColorContainer = document.getElementById('pomodoroColorContainer')
            clearInterval(timerInterval);
            // hay que resetear timePassed para que el contador, al ser otra vez llamada la funcion, no empiece desde su valor antiguo
            timePassed = 0
                // time left va a valer lo que valga timeLimit
            timeLeft = 1500;
            // imprimimos
            const baseTimerLabel = document.getElementById('base-timer-label').textContent = `${formatTimeLeft(timeLeft)}`
                // cambiamos el color 
            pomodoroColorContainer.classList.replace('green-color', 'orange-color');
            // mostramos notificacion
            showPomodoroNoti()
                // obtenemos hora y la guardamos en un array
            getTime()
            time.push(fullTime)
                // guardamos el numero del pomodoro y la hora en el sessionStorage
            saveData()
                // obtenemos los datos
            getData()
                // imprimimos los datos
            showData()
                // reestablecemos el boton



        }
    }, 1500000)
}

// guardamos el numero del pomodoro y la hora en el sessionStorage
const saveData = () => {
    let progress = {
        pomodoros: count,
        hour: time[count - 1]

    };
    let progressJSON = JSON.stringify(progress)
    sessionStorage.setItem(`progress${count}`, progressJSON)
};

// obteniendo la data desde el sessionStorage
let dataSaver = []
const getData = () => {
    let progress = JSON.parse(sessionStorage.getItem(`progress${count}`));
    dataSaver.push(progress);
};

const showData = () => {
    const pomodoros = document.getElementById("pomodoros")
    const itemList = document.createElement('li');
    let item = dataSaver.pop()
    itemList.textContent = `${item.pomodoros} a las ${item.hour}`;
    pomodoros.appendChild(itemList);

}

// llamamos al boton de pomodoro e invocamos la funcion
const startPomodoro = document.getElementById('startPomodoro');
startPomodoro.addEventListener('click', () => {
    startPomodoro.disabled = true
    startBreak.disabled = true
    setTimeout(() => {
        startPomodoro.disabled = false
        startBreak.disabled = false
    }, 1500000)

    startTimer();
})





//  aumentando el padding bottom del contenedor
// let paddingCounter = 0
// const addPadding = () => {
//     if (count == 5) {
//         paddingCounter += 10
//         pomodoroColorContainer.style.padding = `0 0 ${paddingCounter}px 0`
//         maximum = true
//         console.log(paddingCounter);
//     }
// }



// HTML pomodoro
let app = document.getElementById("app").innerHTML = `
<div class="base-timer">
  <span id="base-timer-label" class="base-timer__label">
    ${formatTimeLeft(timeLeft)}
    </span>
    <h2>Pomodoros hechos en esta sesión:</h2>
    <div class="span-flex">
        <div class="counter">
           <ul id="pomodoros" class="list">
        
            </ul>
        </div>
  </div>
</div>`