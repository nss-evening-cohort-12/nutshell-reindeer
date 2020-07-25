import utils from '../../helpers/utils';
import './causeChaos.scss';
import monkey from '../../../images/angry-monkey.png';
import lightrays from '../../../images/light-rays.jpg';
import splat from '../../../images/paint-splash.png';

let chaosCounter = 0;

const getChaos = () => console.error(chaosCounter);

const randomChaos = () => {
  chaosCounter = utils.randomNum(5, 15);
};

const angryMonkey = () => `<img src="${lightrays}" id="light-rays">
                            <img src="${monkey}" id="angry-monkey">`;

const paintSplat = () => `<img src="${splat}" id="paint-splash">
                          <h1 id="splat-text">Oh no!<br>Amy's been kidnapped by the chaos monkey!</h1>`;

const runChaos = () => {
  console.error('chaos triggered');
  $('body').addClass('flash');
  setTimeout(() => {
    $('#chaosMonkey').html(angryMonkey).fadeIn();
  }, 1000);
  setTimeout(() => {
    $('#chaosMonkey').html(paintSplat).delay(3000).fadeOut();
  }, 5000);
  setTimeout(() => {
    $('#chaosMonkey').html('');
    $('body').removeClass('flash');
  }, 10000);
};

const decreaseChaos = () => {
  if (chaosCounter === 0) {
    randomChaos();
    runChaos();
  } else {
    chaosCounter -= 1;
  }
};

export default { randomChaos, getChaos, decreaseChaos };
