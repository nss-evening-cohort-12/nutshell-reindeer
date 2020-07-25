import utils from '../../helpers/utils';
import './chaos.scss';
import monkey from '../../../images/angry-monkey.png';
import lightrays from '../../../images/light-rays.jpg';
import splat from '../../../images/paint-splash.png';

let chaosCounter = 0;

const getChaos = () => console.error(chaosCounter);

const randomChaos = () => {
  chaosCounter = utils.randomNum(5, 15);
};

const decreaseChaos = () => {
  if (chaosCounter === 0) {
    randomChaos();
  } else {
    chaosCounter -= 1;
  }
};

const angryMonkey = () => `<img src="${lightrays}" id="light-rays">
                            <img src="${monkey}" id="angry-monkey">`;

const paintSplat = () => `<img src="${splat}" id="paint-splash">
                          <h1 id="splat-text">Oh no!<br>Amy's been kidnapped by the chaos monkey!</h1>`;

const runChaos = () => {
  console.error('test click');
  $('body').addClass('flash');
  setTimeout(() => {
    $('#chaos-monkey').html(angryMonkey);
  }, 1000);
  setTimeout(() => {
    $('#chaos-monkey').html(paintSplat).delay(3000).fadeOut();
  }, 5000);
  setTimeout(() => {
    $('#chaos-monkey').html('');
    $('body').removeClass('flash');
  }, 10000);
};

export default { randomChaos, getChaos, decreaseChaos };
