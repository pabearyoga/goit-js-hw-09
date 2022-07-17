const body = document.querySelector('body');
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
let timerColor = null;

stop.setAttribute('disabled', true);
start.addEventListener('click', onStartClick);
stop.addEventListener('click', onStopClick);

function onStartClick() {
  start.setAttribute('disabled', true);
  stop.removeAttribute('disabled', false);
  timerColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStopClick() {
  start.removeAttribute('disabled', true);
  stop.setAttribute('disabled', true);
  clearInterval(timerColor);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

