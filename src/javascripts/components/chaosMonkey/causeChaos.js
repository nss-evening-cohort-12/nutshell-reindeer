import utils from '../../helpers/utils';
import './causeChaos.scss';
import monkey from '../../../assets/images/angry-monkey.png';
import lightrays from '../../../assets/images/light-rays.jpg';
import splat from '../../../assets/images/paint-splash.png';

let chaosCounter = 0;

const getChaos = () => console.error(chaosCounter);

const randomChaos = () => {
  chaosCounter = utils.randomNum(5, 15);
};

const angryMonkey = () => `<img src="${lightrays}" id="light-rays">
                            <img src="${monkey}" id="angry-monkey">`;

const paintSplat = (text) => `<img src="${splat}" id="paint-splash">
                          <h1 id="splat-text">${text}</h1>`;

const runChaos = (text) => {
  console.error('chaos triggered');
  $('body').addClass('flash'); // trigger lightning flass
  setTimeout(() => $('body').removeClass('flash'), 600); // remove flash class after 600ms
  setTimeout(() => $('#chaosMonkey').html(angryMonkey), 600); // 2s animation after fade in monkey animation
  setTimeout(() => $('#chaosMonkey').html(paintSplat(text)).delay(2000).fadeOut(1000), 4600);
  setTimeout(() => $('#chaosMonkey').html(''), 10000);
  setTimeout(() => $('#chaosMonkey').css('display', ''), 12000);
};

const decreaseChaos = (text) => {
  console.error(chaosCounter);
  if (chaosCounter === 0) {
    randomChaos();
    runChaos(text);
  } else {
    chaosCounter -= 1;
  }
};

export default { randomChaos, getChaos, decreaseChaos };
