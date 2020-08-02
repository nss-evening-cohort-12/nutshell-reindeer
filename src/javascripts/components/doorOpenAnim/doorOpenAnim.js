import utils from '../../helpers/utils';
import wall from '../../../assets/images/intro-wall.png';
import topDoor from '../../../assets/images/intro-door-top.png';
import bottomDoor from '../../../assets/images/intro-door-bottom.png';
import redLight from '../../../assets/images/red-light.png';
import yellowLight from '../../../assets/images/yellow-light.png';
import './doorOpenAnim.scss';

const openDoors = () => {
  const domString = `<img src="${yellowLight}" id="redlight" class="opendoors">
                    <img src="${redLight}" id="yellowlight" class="opendoors">
                    <img src="${wall}" id="wall" class="opendoors">
                   <img src="${topDoor}" id="top-door" class="opendoors">
                   <img src="${bottomDoor}" id="bottom-door" class="opendoors">`;
  utils.printToDom('#openDoor', domString);
  setTimeout(() => {
    $('#openDoor').remove();
  }, 8000);
};

export default { openDoors };
