let chain = [];
let guesses = [];
let sounds = ['415.30', '440.00', '466.16', '493.88', '250'];
const buttons = document.querySelectorAll('.game__button');

const blink = (el, delay, index) => {
  setTimeout(() => {
    el.classList.add('blink');
    playSound(index);

    setTimeout(() => {
      el.classList.remove('blink');
    }, 500);
  }, delay);
};

const toggleDisabled = () => {
  buttons.forEach((el) => {
    el.disabled = !el.disabled;
  });
};

const addColor = () => {
  const color = Math.ceil(Math.random() * 4);
  chain.push(color);

  for (let i = 0; i < chain.length; i++) {
    blink(document.querySelector(`.game__button:nth-child(${chain[i]})`), i * 1000, chain[i] - 1);
  }

  setTimeout(toggleDisabled, chain.length * 1000);
};

const playSound = (index) => {
  // one context per document
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var osc = context.createOscillator(); // instantiate an oscillator
  osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
  osc.frequency.value = sounds[index]; // Hz
  osc.connect(context.destination); // connect it to the destination
  osc.start(); // start the oscillator
  osc.stop(context.currentTime + .2); // stop 2 seconds after the current time
};

document.querySelector('.game__start').addEventListener('click', () => {
  chain = [];
  guesses = [];
  document.body.style.backgroundColor = 'white';
  addColor();
});

buttons.forEach((el) => {
  el.addEventListener('click', () => {
    const guess = Array.prototype.indexOf.call(buttons, el) + 1;

    el.classList.add('blink');
    setTimeout(() => {
      el.classList.remove('blink');
    }, 200);

    if (chain[guesses.length] === guess) {
      guesses.push(guess);
      playSound(guess - 1);
    } else {
      document.body.style.backgroundColor = 'red';
      toggleDisabled();
      playSound(4);
    }

    if (chain.length === guesses.length) {
      guesses = [];
      toggleDisabled();
      setTimeout(addColor, 1000);
    }
  });
});
