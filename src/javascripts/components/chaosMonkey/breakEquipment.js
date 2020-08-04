import utils from '../../helpers/utils';
import monkeyData from '../../helpers/data/monkeyData';
import equipData from '../../helpers/data/equipData';
import notifications from '../notifications/notifications';

const breakEquipment = () => new Promise((resolve, reject) => {
  equipData.getAllEquipment()
    .then((equipmentList) => {
      const breakableEquip = equipmentList.filter((actives) => actives.isOperational === true); // get only the equipment with isOperational == true
      const brokenEquip = breakableEquip[utils.randomNum(0, breakableEquip.length)]; // select a single random piece of equipment from that list
      console.error(brokenEquip);
      equipData.patchEquipment(brokenEquip.id, { assignedTo: '', isOperational: false })
        .then(() => {
          monkeyData.addMonkeyLog({ dateTime: Date.now(), message: `The Chaos Monkey has broken the ${brokenEquip.name}.` });
          notifications.buildNotification();
        });
      resolve(`The Chaos Monkey has broken the ${brokenEquip.name}!`);
    })
    .catch((err) => reject(err));
});

export default { breakEquipment };
