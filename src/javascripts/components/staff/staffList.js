import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import './staffList.scss';
import checkUser from '../../helpers/data/checkUser';

const staffIcon = (staffMember) => {
  let icon = '';
  if (staffMember.isActive) {
    // eslint-disable-next-line no-unused-expressions
    staffMember.assignedTo ? icon = 'fas fa-user' : icon = 'far fa-user';
  } else {
    icon = 'fas fa-user-slash';
  }
  return `<i class="${icon} fa-5x text-secondary m-4"></i>`;
};

const addStaffForm = () => {
  const domString = `
  <div class="modal" id="addStaffModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New Staff</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

  <form id="staffAddForm" class="px-4 py-3">
    <div class="form-group">
      <label for="addStaffName">Staff Name</label>
      <input type="text" class="form-control" name="addStaffName">
    </div>
    <div class="form-group">
      <label for="addStaffTitle">Staff Title</label>
      <input type="text" class="form-control" name="addStaffTitle">
    </div>
    <div class="form-group">
      <label for="addStaffImgUrl">Staff Image URL</label>
      <input type="url" class="form-control" name="addStaffImgUrl">
    </div>
    <button type="submit" class="btn btn-primary">Hire</button>
  </form>
  </div>
    </div>
  </div>
</div>`;
  return domString;
};

const staffCard = (employee) => {
  let domString = `<div class="card staff-card align-items-center m-3${employee.isActive ? ' ' : ' inactive'}" id="${employee.id}">
      ${staffIcon(employee)}
      <div class="card-body">
        <h5 class="card-title">${employee.name}</h5>
        <p class="card-text">${employee.title}</p>`;
  if (!employee.isActive) {
    domString += '<p class="card-text">INACTIVE</p>';
  } else if (employee.assignedTo === '') {
    domString += '<p class="card-text">currently unassigned</p>';
  } else {
    domString += `<p class="card-text">assigned to ${employee.assignment.name}</p>`;
  }
  if (checkUser.checkUser()) {
    domString += `
          <div class="links card-text text-center">
            ${employee.isActive ? '<a href="#" class="assignStaff mr-4 card-link"><i class="fas fa-calendar-plus"></i></a>' : ''}
            <a href="#" class="editStaff mr-4 card-link"><i class="fas fa-pen"></i></a>
            <a href="#" class="deleteStaff ml-4 card-link"><i class="far fa-trash-alt"></i></a>
          </div>`;
  }
  domString += `
      </div>
    </div>`;
  return domString;
};

// Checks for Staff that have no assignments and hides all others

const unassignedStaff = (e) => {
  staffData.getStaffWithAssignments()
    .then((staff) => {
      if (e.target.checked === true) {
        staff.forEach((person) => {
          if (person.assignedTo || person.isActive === false) {
            $(`#${person.id}`).closest('.card').addClass('hide-assigned');
          }
        });
      } else if (e.target.checked === false) {
        $('.card').removeClass('hide-assigned');
      }
    })
    .catch((err) => console.error('Getting staff for assignments did not work -> ', err));
};

const displayStaff = () => {
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addStaffForm());
  }
  let domString = `
    <div class="form-check unassigned-box">
      <input class="form-check-input" type="checkbox" value="" id="unassigned-staff">
      <label class="form-check-label" for="unassigned-staff">
        See Unassigned Staff
      </label>
    </div>
    <div class="d-flex flex-wrap">
  `;
  staffData.getStaffWithAssignments()
    .then((allStaff) => {
      allStaff.forEach((employee) => {
        domString += staffCard(employee);
      });
      domString += '</div>';
      utils.printToDom('#displayCards', domString);
      utils.setState('staff');
    })
    .catch((err) => console.error('problem getting staff assignment', err));
};

const addStaff = (e) => {
  e.preventDefault();
  const newStaff = {
    name: e.target.elements.addStaffName.value,
    title: e.target.elements.addStaffTitle.value,
    imgUrl: e.target.elements.addStaffImgUrl.value,
    isActive: true,
  };
  staffData.addStaff(newStaff).then(() => {
    $('#addStaffModal').modal('hide');
    displayStaff();
  });
};

export default { displayStaff, addStaff, unassignedStaff };
