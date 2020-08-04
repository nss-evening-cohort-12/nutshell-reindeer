import utils from '../../helpers/utils';
import wall from '../../../assets/images/intro-wall2.png';
import topDoor from '../../../assets/images/intro-door-top2.png';
import bottomDoor from '../../../assets/images/intro-door-bottom2.png';
import redLight from '../../../assets/images/red-light2.png';
import yellowLight from '../../../assets/images/yellow-light2.png';
import baydooropen from '../../../assets/sounds/baydooropen.mp3';
import './doorOpenAnim.scss';
import frontPageConsole from '../frontPageConsole/frontPageConsole';
// import settingsData from '../../helpers/data/settingsData';
// import authData from '../../helpers/data/authData';

const animOpenDoor = () => {
  if ($('#openDoor').length) {
    $('.opendoors').css('animation-play-state', 'running');
    $('#bayDoorSound').get(0).play();
    frontPageConsole.printConsole();
    setTimeout(() => {
      $('#openDoor').remove();
    }, 5000);
  }
};

const openDoors = () => {
  //   .then((result) => console.warn('settings check result', result));
  const domString = `<img src="${yellowLight}" id="redlight" class="opendoors">
                    <img src="${redLight}" id="yellowlight" class="opendoors">
                    <img src="${wall}" id="wall" class="opendoors">
                   <img src="${topDoor}" id="top-door" class="opendoors">
                   <img src="${bottomDoor}" id="bottom-door" class="opendoors">
                    <audio src="${baydooropen}" id="bayDoorSound"></audio>`;
  utils.printToDom('#openDoor', domString);
  $('body').on('click', '#openDoor', animOpenDoor);
};

export default { openDoors, animOpenDoor };
