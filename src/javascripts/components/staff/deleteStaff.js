import staffList from './staffList';
import staffData from '../../helpers/data/staffData';
import scheduleData from '../../helpers/data/scheduleData';
import equipData from '../../helpers/data/equipData';

const deleteStaff = (e) => {
  const collectionId = e.target.closest('.card').id;
  staffData.deleteStaffById(collectionId)
    .then(() => {
      equipData.getAllEquipment()
        .then((equipment) => {
          scheduleData.getSchedule()
            .then((schedules) => {
              schedules.forEach((schedule) => {
                if (schedule.staffId === collectionId) {
                  scheduleData.deleteScheduleById(schedule.id);
                }
              });
              equipment.forEach((equip) => {
                if (equip.assignedTo === collectionId) {
                  equipData.patchEquipment(equip.id, { assignedTo: '' });
                }
              });
              staffList.displayStaff();
            });
        });
    })
    .catch((err) => console.error('could not delete staff member ', err));
};

export default { deleteStaff };
