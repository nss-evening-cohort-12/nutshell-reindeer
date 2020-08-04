import staffList from './staffList';
import staffData from '../../helpers/data/staffData';
import scheduleData from '../../helpers/data/scheduleData';

const deleteStaff = (e) => {
  const collectionId = e.target.closest('.card').id;
  staffData.deleteStaffById(collectionId)
    .then(() => {
      scheduleData.getSchedule()
        .then((schedules) => {
          schedules.forEach((schedule) => {
            if (schedule.staffId === collectionId) {
              scheduleData.deleteScheduleById(schedule.id);
            }
          });
          staffList.displayStaff();
        });
    })
    .catch((err) => console.error('could not delete staff member ', err));
};

export default { deleteStaff };
