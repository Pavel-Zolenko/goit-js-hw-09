import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onForm(event) {
  event.preventDefault();

  let delayValue = Number(event.currentTarget.delay.value);
  const stepValue = Number(event.currentTarget.step.value);
  const amountValue = Number(event.currentTarget.amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue).then(onSuccess).catch(onError);

    delayValue += stepValue;
  }
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}