import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const submit = document.querySelector('button[type="submit"]');
let firstPosition = 1;
let amount = null;
let firstDelay = null;
let delayStep = null;
let timerId = null;

form.addEventListener('input', onFormInput);
submit.addEventListener('click', onSubmitClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormInput() {
  clearInterval(timerId);
  onDelayInputValue();
  onStepInputValue();
  onAmountInputValue();
}

function onSubmitClick(event) {
  event.preventDefault();
  timerId = setInterval(() => {
    if (firstPosition === amount + 1) {
      return;
    }
    createPromise(firstPosition, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstPosition += 1;
    firstDelay += delayStep;
  }, amount);

  firstPosition = 1;
}

function onDelayInputValue() {
  firstDelay = Number(delayInput.value);
  if (delayInput.value === '') {
    firstDelay = 0;
  }
}
function onStepInputValue() {
  delayStep = Number(stepInput.value);
  if (stepInput.value === '') {
    delayStep = 0;
  }
}
function onAmountInputValue() {
  amount = Number(amountInput.value);
  if (amountInput.value === '') {
    amount = 0;
  }
}
