import screen from '../../../assets/images/screen.png';
import mic from '../../../assets/images/mic.png';
import keypad from '../../../assets/images/keypad.png';
import speaker from '../../../assets/images/speaker.png';
import pipe from '../../../assets/images/pipe.png';
import utils from '../../helpers/utils';
import './frontPageConsole.scss';

const printConsole = () => {
  const domString = `<div id="frontConsoleCont">
                    <img src="${screen}" id="screen">
                    <img src="${mic}" id="mic">
                    <img src="${keypad}" id="keypad">
                    <img src="${speaker}" id="speaker">
                    <img src="${pipe}" id="pipe">
                    <img src="${pipe}" id="pipe2">
                    <div class="typewriter">
                      <h1>WELCOME TO JURASSIC WORLD!</h1>
                    </div>
                    <div class="typewriter2">
                      <h1>PLEASE LOG IN TO USE THE CONSOLE</h1>
                    </div>
                    <div class="typewriter3">
                      <h1>></h1>
                    </div>
                    </div>
                    `;
  utils.printToDom('#displayCards', domString);
};

export default { printConsole };
