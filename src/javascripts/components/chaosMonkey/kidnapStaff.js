import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';
import monkeyData from '../../helpers/data/monkeyData';
import equipData from '../../helpers/data/equipData';

const kidnapStaff = () => new Promise((resolve, reject) => {
  staffData.getStaff()
    .then((staffList) => {
      const kidnappableStaff = staffList.filter((actives) => actives.isActive === true); // get only the staff with isActive == true
      const kidnappedStaff = kidnappableStaff[utils.randomNum(0, kidnappableStaff.length)]; // select a single random staff member from that list
      console.error(kidnappedStaff);
      staffData.deleteStaffById(kidnappedStaff.id)
        .then(() => {
          equipData.getAllEquipment()
            .then((equipment) => {
              const updatedEquipment = equipment.filter((hasStaff) => hasStaff.assignedTo === kidnappedStaff.id);
              updatedEquipment.forEach((equip) => {
                console.error(equip);
                equipData.patchEquipment(equip.id, { assignedTo: '' });
              });
              monkeyData.addMonkeyLog({ dateTime: Date.now(), message: `Staff member ${kidnappedStaff.name} has been kidnapped.` });
            });
        });
      resolve(`Staff member ${kidnappedStaff.name} has been kidnapped!`);
    })
    .catch((err) => reject(err));
});

export default { kidnapStaff };
