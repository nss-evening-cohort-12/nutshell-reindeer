import utils from '../../helpers/utils';
import './causeChaos.scss';
import monkey from '../../../assets/images/angry-monkey.png';
import lightrays from '../../../assets/images/light-rays.jpg';
import splat from '../../../assets/images/paint-splash.png';
import screech from '../../../assets/sounds/monkey.mp3';
import splatSound from '../../../assets/sounds/splat.mp3';
import kidnapStaff from './kidnapStaff';
import breakEquipment from './breakEquipment';
import breakRide from './breakRide';
import dinoList from '../dinos/dinoList';
import staffList from '../staff/staffList';
import rideList from '../rides/rideList';
import vendorList from '../vendors/vendorList';

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

const callStateReprint = (selectedState) => {
  switch (selectedState) {
    case 'dinos': return dinoList.displayDinos();
    case 'staff': return staffList.displayStaff();
    case 'rides': return rideList.displayRides();
    case 'vendors': return vendorList.displayVendors();
    default: return console.error('no current state');
  }
};

const runChaos = (msg) => {
  $('body').addClass('flash'); // trigger lightning flass
  setTimeout(() => $('body').removeClass('flash'), 600); // remove flash class after 600ms
  setTimeout(() => $('#chaosMonkey').html(angryMonkey), 600); // 2s animation after fade in monkey animation
  setTimeout(() => $('#chaosMonkey').html(paintSplat(`${msg}`)).delay(2000).fadeOut(1000), 3000);
  setTimeout(() => $('#chaosMonkey').html(''), 10000); // removes chaos monkey from the dom
  setTimeout(() => $('#chaosMonkey').css('display', ''), 12000); // removes display property from chaos div
};

const decreaseChaos = () => {
  console.error('countdown to Chaos Monkey: ', chaosCounter); // logs current counter number
  if (chaosCounter === 0) {
    randomChaos(); // reset counter to new random number
    switch (utils.randomNum(1, 3)) {
      case 1:
        breakRide.breakRide()
          .then((msg) => {
            runChaos(msg);
            callStateReprint(utils.getState);
          })
          .catch((err) => console.error(err));
        break;
      case 2:
        kidnapStaff.kidnapStaff()
          .then((msg) => {
            runChaos(msg);
            callStateReprint(utils.getState);
          })
          .catch((err) => console.error(err));
        break;
      case 3:
        breakEquipment.breakEquipment()
          .then((msg) => {
            runChaos(msg);
            callStateReprint(utils.getState);
          })
          .catch((err) => console.error(err));
        break;
      default: // linter demands default
    }
  } else {
    chaosCounter -= 1;
  }
};

export default {
  randomChaos,
  getChaos,
  decreaseChaos,
};
