// Setup

let emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'];
emojis.push(...emojis);

// Credit: https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
for (let i = emojis.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i);
  const temp = emojis[i];
  emojis[i] = emojis[j];
  emojis[j] = temp;
}

const cardsMarkup = emojis.map((emoji) => {
  return `
    <div class="card">
      <div class="card__front">${emoji}</div>
      <div class="card__back"></div>
    </div>
  `;
});

document.getElementById('board').insertAdjacentHTML('afterbegin', cardsMarkup.join(''));

// Flip Logic

let firstIndex = null, firstTarget = null;
const cards = Array.from(document.getElementById('board').children);
const unflip = (cardA, cardB) => {
  setTimeout(() => {
    cardA.classList.remove('is-flipped');
    cardB.classList.remove('is-flipped');
  }, 1000);
};
const flip = (card) => {
  if (!card.classList.contains('is-flipped')) {
    const index = Array.prototype.indexOf.call(cards, card);

    card.classList.add('is-flipped');

    if (firstIndex === null) {
      firstIndex = index;
      firstTarget = card;
    } else {
      if (emojis[firstIndex] !== emojis[index]) {
        unflip(firstTarget, card);
      }

      firstIndex = null;
      firstTarget = null;
    }
  }
};

document.querySelectorAll('.card').forEach(el => {
  el.addEventListener('mousedown', () => {
    flip(el);
  });
});
