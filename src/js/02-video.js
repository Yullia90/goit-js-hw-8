// HTML містить < iframe > з відео для Vimeo плеєра.
// Напиши скрипт, який буде зберігати поточний час відтворення відео у локальне сховище і,
// після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.

// 1.Ознайомся з документацією бібліотеки Vimeo плеєра.
// 2.Додай бібліотеку як залежність проекту через npm.
// 3.Ініціалізуй плеєр у файлі скрипта як це описано в секції pre - existing player,
// але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
// 4.Вивчи документацію методу on() і почни відстежувати подію timeupdate -
// оновлення часу відтворення.
// 5.Зберігай час відтворення у локальне сховище.Нехай ключем для сховища буде рядок
// "videoplayer-current-time".
// 6.Під час перезавантаження сторінки скористайся методом setCurrentTime()
// з метою відновлення відтворення зі збереженої позиції.
// Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення
//  оновлювався у сховищі не частіше, ніж раз на секунду.

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(e) {
  const time = e.seconds;
  localStorage.setItem('videoplayer-current-time', time);
}

const currentTime = localStorage.getItem('videoplayer-current-time');

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
