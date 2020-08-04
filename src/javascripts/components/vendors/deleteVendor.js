import vendorList from './vendorList';
import vendorData from '../../helpers/data/vendorData';
import staffData from '../../helpers/data/staffData';

const deleteVendor = (e) => {
  const collectionId = e.target.closest('.card').id;
  vendorData.deleteVendorById(collectionId)
    .then(() => {
      staffData.getStaff(collectionId)
        .then((allStaff) => {
          const employeesToUpdate = [];

          allStaff.forEach((staff) => {
            if (staff.assignedTo === collectionId) {
              const editedStaff = staff;
              const editedAssignedTo = { assignedTo: '' };
              const editedAssignmentCategory = { assignmentCategory: '' };

              employeesToUpdate.push(staffData.patchStaff(editedStaff.id, editedAssignedTo));
              employeesToUpdate.push(staffData.patchStaff(editedStaff.id, editedAssignmentCategory));
            }
          });
          Promise.all(employeesToUpdate)
            .then(() => {
              vendorList.displayVendors();
            });
        });
    })
    .catch((err) => console.error(err));
};

export default { deleteVendor };
