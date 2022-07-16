import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let selectedDate = null;
let timerId = null;
const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      startBtn.removeAttribute('disabled');
      clearInterval(timerId);
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';

      Notify.success('Back to the Future ⏳');
    }
  },
};

startBtn.setAttribute('disabled', true);
flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startBtn.setAttribute('disabled', true);

  timerId = setInterval(() => {
    const timer = convertMs(selectedDate - new Date());
    if (selectedDate > new Date()) {
      const { days, hours, minutes, seconds } = timer;
      daysValue.textContent = addLeadingZero(days);
      hoursValue.textContent = addLeadingZero(hours);
      minutesValue.textContent = addLeadingZero(minutes);
      secondsValue.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(timerId);
      Notify.failure('Please choose a date in the future');
      return;
    }

    // if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    //   clearInterval(timerId);
    // }

    const values = Object.values(timer);
    const timerValues = values.every(value => value === 0);
    if (timerValues) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
