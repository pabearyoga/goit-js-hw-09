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
    }, delaY); //first delay);
  });
}
let positioN = 0;
let amounT = 10;
let delaY = 1000;

setInterval(() => {
  if (positioN === amounT) {
    return;
  }
  positioN += 1;
  delaY += 2000;
  createPromise(positioN, delaY)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}, delaY);
