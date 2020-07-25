import staffList from './staffList';
import staffData from '../../helpers/data/staffData';

const deleteStaff = (e) => {
  const collectionId = e.target.closest('.card').id;
  staffData.deleteStaffById(collectionId)
    .then(() => {
      staffList.displayStaff();
    })
    .catch((err) => console.error('could not delete staff member ', err));
};

export default { deleteStaff };
