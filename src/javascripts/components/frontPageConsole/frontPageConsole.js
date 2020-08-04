import screen from '../../../assets/images/screen.png';
import mic from '../../../assets/images/mic.png';
import keypad from '../../../assets/images/keypad.png';
import speaker from '../../../assets/images/speaker.png';
import pipe from '../../../assets/images/pipe.png';
import lever from '../../../assets/images/lever.png';
import guage from '../../../assets/images/guage.png';
import transparentScreen from '../../../assets/images/transparentScreen.png';
import loop from '../../../assets/images/loop.gif';
import utils from '../../helpers/utils';
import './frontPageConsole.scss';
import auth from '../auth/auth';

const printConsole = () => {
  let domString = '<div id="frontConsoleCont">';
  if (auth.getUser()) {
    domString += `<img src="${transparentScreen}" id="transparentScreen">
                  <img src="${loop}" id="loop">`;
  } else {
    domString += `<img src="${screen}" id="screen">
                  <div class="typewriter">
                    <h1>WELCOME TO JURASSIC WORLD!</h1>
                  </div>
                  <div class="typewriter2">
                    <h1>PLEASE LOG IN TO USE THE CONSOLE</h1>
                  </div>
                  <div class="typewriter3">
                    <h1>></h1>
                  </div>`;
  }
  domString += `<img src="${mic}" id="mic">
                    <img src="${keypad}" id="keypad">
                    <img src="${speaker}" id="speaker">
                    <img src="${pipe}" id="pipe">
                    <img src="${pipe}" id="pipe2">
                    <img src="${lever}" id="lever">
                    <img src="${guage}" id="guage">
                    </div>
                    `;
  utils.printToDom('#displayCards', domString);
};

export default { printConsole };
