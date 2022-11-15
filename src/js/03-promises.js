import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector(".form"),
};
refs.form.addEventListener("submit", onBattonSubmit);

function onBattonSubmit(e) {
  e.preventDefault();
 
  const delay = Number(e.currentTarget.delay.value);
  const step = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);
  
  for (i = 1; i <= amount; i += 1) {
    
      createPromise(i, delay)
      .then(onCreatePromiseSuccess)
      .catch(onCreatePromiseError);
    delay += step;
    
  }
};
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
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
function onCreatePromiseSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  console.log(`:белая_галочка: Fulfilled promise ${position} in ${delay}ms`);
}
function onCreatePromiseError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  console.log(`:х: Rejected promise ${position} in ${delay}ms`);
}


