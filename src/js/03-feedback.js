// 1.Відстежуй на формі подію input, і щоразу записуй у локальне сховище
// об'єкт з полями email і message, у яких зберігай поточні значення полів форми.
// Нехай ключем для сховища буде рядок "feedback-form-state".
// 2.Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані,
// заповнюй ними поля форми.В іншому випадку поля повинні бути порожніми.
// 3.Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт
// з полями email, message та їхніми поточними значеннями.
// 4.Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
//  Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

// import throttle from 'lodash.throttle';

// const STORAGE_KEY = 'feedback-form-state';
// const formData = {};

// const formEl = document.querySelector('.feedback-form');
// // const textareaEl = document.querySelector('.feedback-form textarea');

// formEl.addEventListener('submit', onFormSubmit);
// formEl.addEventListener('input', throttle(onTextareaInput, 500));
// formEl.addEventListener('input', event => {
//   formData[event.target.name] = event.target.value;
//   localStorage.setItem(STORAGE_KEY, message);
// });

// populateTextarea();

// function onFormSubmit(event) {
//   event.preventDefault();
//   console.log(formData);
//   event.currentTarget.reset();
//   localStorage.removeItem(STORAGE_KEY);
// }

// function populateTextarea() {
//   const savedMessage = localStorage.getItem(STORAGE_KEY);
//   if (savedMessage) {
//     textareaEl.value = savedMessage;
//   }
// }
// ==========================================================================
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const saveData = {};
onSetInput();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));

function onTextareaInput(event) {
  saveData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
}

function onSetInput() {
  let getInput = localStorage.getItem(STORAGE_KEY);
  if (getInput) {
    getInput = JSON.parse(getInput);
    Object.entries(getInput).forEach(([name, value]) => {
      saveData[name] = value;
      form.elements[name].value = value;
    });
  }
}
function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  formData.forEach((value, name) => console.log(`${name}:`, value));
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
