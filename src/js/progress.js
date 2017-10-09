import css from '../sass/progress.sass';
import './components/polyfill';
import Helpers from './components/helpers';

const Progress = (() => {

  let transform = Helpers.supportCss('transform'),
    transition = Helpers.supportCss('transition'),
    transitionEnd = Helpers.transitionEventEnd(),
    isLoading,
    bar;

  let settings = {
    position: 'top',
    timingFunction: 'linear',
    speed: 300
  };

  const config = (options = {}) => {
    for (var name in options) {
      if (settings.hasOwnProperty(name)) {
        settings[name] = options[name];
      }
    }
  };

  const numRandom = () => Math.round(Math.random() * 100);

  function init() {
    bar = document.getElementById('progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'progress';
      bar.className = `loading ${settings.position === 'bottom' ? 'loading--bottom' : ''}`;
      bar.innerHTML = '<div class="loading__inner">';
      bar.style[transition] = `all ${settings.speed}ms ${settings.timingFunction}`;
      document.body.appendChild(bar);
    }
    isLoading = true;
  }

  function set(num) {
    init();

    num = (Number.isInteger(num) && num < 100)
      ? num
      : numRandom();

    setTimeout(() => {
      bar.style[transform] = `translate3d(${num}%, 0, 0)`;
    }, 0);
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
        bar = null;
        isLoading = false;
      }, settings.speed);
    });

  }

  return {
    set,
    done,
    config
  };

})();

window.Progress = Progress;