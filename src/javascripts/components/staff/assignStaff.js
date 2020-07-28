import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import jobsData from '../../helpers/data/jobsData';
import staffList from './staffList';

const assignmentMenu = (employee, allJobs) => {
  const populateJobMenu = () => {
    let jobOptions = '';
    const department = $('#assignjob-category').val();
    Object.keys(allJobs[department]).forEach((job) => {
      jobOptions += `<option value="${job}">${allJobs[department][job].name}</option>`;
    });
    const btmMenu = `
    <label for="assignjob-assignment">Assignment:</label>
    <select name="assignjob-assignment" id="assignjob-assignment">
    ${jobOptions}
    </select>
    `;
    utils.printToDom('#btm-assignment-menu', btmMenu);
  };

  $('body').on('change', '#assignjob-category', populateJobMenu);
  const topMenu = `
  <label for="assignjob-category">Department:</label>
  <select name="assignjob-category" id="assignjob-category">
    <option value=""></option>
    <option value="dinosaurs">Dinosaurs</option>
    <option value="rides">Rides</option>
    <option value="vendors">Vendors</option>
  </select>
  `;
  console.warn(employee, allJobs);
  utils.printToDom('#top-assignment-menu', topMenu);
};

const assignStaff = (e) => {
  const staffId = e.target.closest('.card').id;
  staffData.getStaffById(staffId)
    .then((employeeData) => {
      jobsData.getAllJobs()
        .then((allJobs) => {
          const employee = employeeData.data;
          console.warn('final product', employee.data, allJobs);
          const domString = `
          <h5 class="card-title">${employee.name}</h5>
          <p class="card-text">${employee.title}</p>
          <h6 class="card-text">Current assignment:</h6>
          <p class="card-text">${staffList.jobIcon(employee.assignmentCategory)} ${allJobs[employee.assignmentCategory][employee.assignedTo].name}</p>
          <h6 class="card-text">New assignment:</h6>
          <div id="new-assignment"></div>
          <div id="top-assignment-menu"></div>
          <div id="btm-assignment-menu"></div>`;
          utils.printToDom(`#${staffId}`, domString);
          assignmentMenu(employee, allJobs);
        });
    });
};

export default { assignStaff };
