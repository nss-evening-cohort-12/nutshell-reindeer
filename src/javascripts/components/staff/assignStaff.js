import utils from '../../helpers/utils';
// import staffData from '../../helpers/data/staffData';
import jobsData from '../../helpers/data/jobsData';

const assignStaff = (e) => {
  const staffId = e.target.closest('.card').id;
  // staffData.getStaffWithAssignments()
  //   .then((staff))
  jobsData.getAllJobs()
    .then((allJobs) => {
      console.warn('final product', allJobs);
    });
  utils.printToDom(`#${staffId}`, 'hi');
};

export default { assignStaff };
