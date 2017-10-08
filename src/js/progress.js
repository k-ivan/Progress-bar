import css from '../scss/progress.sass';
import './components/polyfill';
import Helpers from './components/helpers';

const Progress = (() => {

  let transform = Helpers.supportCss('transform'),
    transition = Helpers.supportCss('transition'),
    transitionEnd = Helpers.transitionEventEnd(),
    isLoading,
    bar;

  const numRandom = () => Math.round(Math.random() * 100);

  function set(num, position = 'top') {
    bar = document.getElementById('progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'progress';
      bar.className = `loading ${position !== 'top' ? 'loading--bottom' : ''}`;
      bar.innerHTML = '<div class="loading__inner">';
      document.body.appendChild(bar);
    }

    num = (Number.isInteger(num) && num < 100)
      ? num
      : numRandom();

    setTimeout(() => {
      bar.style[transform] = `translate3d(${num}%, 0, 0)`;
    }, 10);

    isLoading = true;
  }

  function done() {
    if (!isLoading) return;

    bar.style[transform] = 'translate3d(100%, 0, 0)';

    bar.addEventListener(transitionEnd, function handler(evt) {
      if (evt.propertyName !== transform) return;
      bar.removeEventListener(evt.type, handler);
      bar.style.opacity = 0;
      bar.style.height = 0;
      setTimeout(() => {
        bar.parentNode.removeChild(bar);
        isLoading = false;
      }, 300);
    });

  }

  return {
    set,
    done
  };

})();

window.Progress = Progress;