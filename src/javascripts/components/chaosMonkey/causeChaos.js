import utils from '../../helpers/utils';
import './causeChaos.scss';
import monkey from '../../../assets/images/angry-monkey.png';
import lightrays from '../../../assets/images/light-rays.jpg';
import splat from '../../../assets/images/paint-splash.png';
import screech from '../../../assets/sounds/monkey.mp3';
import splatSound from '../../../assets/sounds/splat.mp3';

let chaosCounter = 0;

const getChaos = () => chaosCounter;

const randomChaos = () => {
  chaosCounter = utils.randomNum(5, 15);
};

const angryMonkey = () => `<img src="${lightrays}" id="light-rays">
                            <audio src="${screech}" autoplay></audio>
                            <img src="${monkey}" id="angry-monkey">`;

const paintSplat = (text) => `<img src="${splat}" id="paint-splash">
                              <audio src="${splatSound}" autoplay></audio>
                              <div id="splat-text"><h1>${text}</h1></div>`;

const runChaos = () => {
  $('body').addClass('flash'); // trigger lightning flass
  setTimeout(() => $('body').removeClass('flash'), 600); // remove flash class after 600ms
  setTimeout(() => $('#chaosMonkey').html(angryMonkey), 600); // 2s animation after fade in monkey animation
  setTimeout(() => $('#chaosMonkey').html(paintSplat('test')).delay(2000).fadeOut(1000), 3000);
  setTimeout(() => $('#chaosMonkey').html(''), 10000); // removes chaos monkey from the dom
  setTimeout(() => $('#chaosMonkey').css('display', ''), 12000); // removes display property from chaos div
};

const decreaseChaos = () => {
  console.error(chaosCounter);
  if (chaosCounter === 0) {
    randomChaos();
    runChaos();
  } else {
    chaosCounter -= 1;
  }
};

const randTable = () => {
  let table;
  switch (utils.randomNum(1, 3)) {
    case 1:
      table = { tableName: 'staff', property: 'isActive' };
      break;
    case 2:
      table = { tableName: 'rides', property: 'rideOperational' };
      break;
    case 3:
      table = { tableName: 'equipment', property: 'isActive' };
      break;
    default: // linter demands a default
  }
  return table;
};

const commitChaos = () => {
  // test
};

export default {
  randomChaos,
  getChaos,
  decreaseChaos,
  randTable,
  commitChaos,
};
