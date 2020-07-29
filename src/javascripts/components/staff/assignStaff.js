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
    $('#assignjob-assignment').prop('selectedIndex', -1);
  };

  const getSelectedJob = () => {
    const department = $('#assignjob-category').val();
    const job = $('#assignjob-assignment').val();
    const display = `<p class="card-text text-info">${staffList.jobIcon(department)} ${allJobs[department][job].name}</p>`;
    utils.printToDom('#new-assignment', display);
    let submitFooter = '';

    if (employee.assignedTo === job) {
      submitFooter += `<div class="card-text text-secondary">(${allJobs[department][job].name} already assigned to ${employee.name})`;
      utils.printToDom('#new-assignment', '');
      $('#new-assignment-header').removeClass('text-info').addClass('text-secondary');
    } else {
      $('#new-assignment-header').removeClass('text-secondary').addClass('text-info');
      if (allJobs[department][job].assigned) {
        let currentAssignees = '';
        for (let i = 0; i < allJobs[department][job].assignedTo.length; i += 1) {
          currentAssignees += allJobs[department][job].assignedTo[i].name;
          if (i + 1 < allJobs[department][job].assignedTo.length && allJobs[department][job].assignedTo.length !== 1) currentAssignees += ', ';
        }
        submitFooter += `<div class="card-text text-danger">${allJobs[department][job].name} currently assigned to ${currentAssignees}`;
      }
      submitFooter += `
      <div class="d-flex justify-content-center mt-1">
       <button type="button" class="btn btn-primary" id="submit-assignment" data-staffid="${employee.id}">Assign</button>
      </div>`;
    }
    utils.printToDom('#new-assignment-footer', submitFooter);
  };

  $('body').on('change', '#assignjob-category', populateJobMenu);
  $('body').on('change', '#assignjob-assignment', getSelectedJob);
  const topMenu = `
  <label for="assignjob-category">Department:</label>
  <select name="assignjob-category" id="assignjob-category">
    <option value="dinosaurs">Dinosaurs</option>
    <option value="rides">Rides</option>
    <option value="vendors">Vendors</option>
  </select>
  `;
  utils.printToDom('#top-assignment-menu', topMenu);
  $('#assignjob-category').prop('selectedIndex', -1);
};

const assignStaff = (e) => {
  e.preventDefault();
  const staffId = e.target.closest('.card').id;
  staffData.getStaffById(staffId)
    .then((employeeData) => {
      jobsData.getAllJobs()
        .then((allJobs) => {
          $('.card-link').addClass('hide-assigned');
          const employee = employeeData.data;
          employee.id = staffId;
          const domString = `
          <div class="p-2" style="width: 100%;">
            <button type="button" class="close cancel-job-assignment" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <h5 class="card-title">${employee.name}</h5>
          <h6 class="card-text text-secondary">Current assignment:</h6>
          <p class="card-text text-secondary">${staffList.jobIcon(employee.assignmentCategory)} ${allJobs[employee.assignmentCategory][employee.assignedTo].name}</p>
          <h6 class="card-text text-secondary" id="new-assignment-header">New assignment:</h6>
          <div id="new-assignment"></div>
          <div id="top-assignment-menu"></div>
          <div id="btm-assignment-menu"></div>
          <div id="new-assignment-footer"></div>`;
          utils.printToDom(`#${staffId}`, domString);
          assignmentMenu(employee, allJobs);
        });
    });
};

const assignSelectedJob = (e) => {
  const staffId = e.target.dataset.staffid;
  const department = $('#assignjob-category').val();
  const job = $('#assignjob-assignment').val();
  jobsData.assignNewJob(staffId, department, job)
    .then(() => {
      staffList.displayStaff();
    })
    .catch((err) => console.error(err));
};

export default { assignStaff, assignSelectedJob };
