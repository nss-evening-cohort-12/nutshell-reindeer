import utils from '../../helpers/utils';
import wall from '../../../assets/images/intro-wall2.png';
import topDoor from '../../../assets/images/intro-door-top2.png';
import bottomDoor from '../../../assets/images/intro-door-bottom2.png';
import redLight from '../../../assets/images/red-light2.png';
import yellowLight from '../../../assets/images/yellow-light2.png';
import baydooropen from '../../../assets/sounds/baydooropen.mp3';
import './doorOpenAnim.scss';

const openDoors = () => {
  const domString = `<img src="${yellowLight}" id="redlight" class="opendoors">
                    <img src="${redLight}" id="yellowlight" class="opendoors">
                    <img src="${wall}" id="wall" class="opendoors">
                   <img src="${topDoor}" id="top-door" class="opendoors">
                   <img src="${bottomDoor}" id="bottom-door" class="opendoors">
                    <audio src="${baydooropen}" id="bayDoorSound"></audio>`;
  utils.printToDom('#openDoor', domString);
};

const animOpenDoor = () => {
  if ($('#openDoor').length) {
    $('.opendoors').css('animation-play-state', 'running');
    $('#bayDoorSound').get(0).play();
    setTimeout(() => {
      $('#openDoor').remove();
    }, 5000);
  }
};

export default { openDoors, animOpenDoor };
