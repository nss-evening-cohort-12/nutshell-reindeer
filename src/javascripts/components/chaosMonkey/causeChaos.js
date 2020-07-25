import utils from '../../helpers/utils';

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

export default { randomChaos, getChaos, decreaseChaos };
