// 1.Відстежуй на формі подію input, і щоразу записуй у локальне сховище
// об'єкт з полями email і message, у яких зберігай поточні значення полів форми.
// Нехай ключем для сховища буде рядок "feedback-form-state".
// 2.Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані,
// заповнюй ними поля форми.В іншому випадку поля повинні бути порожніми.
// 3.Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт
// з полями email, message та їхніми поточними значеннями.
// 4.Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
//  Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const formEl = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('.feedback-form textarea');

formEl.addEventListener('submit', onFormSubmit);
textareaEl.addEventListener('input', throttle(onTextareaInput, 500));
formEl.addEventListener('input', event => {
  //   console.log(event.target.name);
  //   console.log(event.target.value);
  formData[event.target.name] = event.target.value;
  console.log(formData);
});

populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();
  console.log('Отправляем форму');
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  const message = event.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}
function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    textareaEl.value = savedMessage;
  }
}
