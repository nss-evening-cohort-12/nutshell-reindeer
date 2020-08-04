import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import './staffList.scss';
import checkUser from '../../helpers/data/checkUser';
import header from '../consoleHeader/consoleHeader';
import addButton from '../addButton/addButton';

const jobIcon = (jobType) => {
  let icon = '';
  switch (jobType) {
    case 'dinosaurs':
      icon = 'fas fa-paw';
      break;
    case 'rides':
      icon = 'fas fa-tram';
      break;
    case 'vendors':
      icon = 'fas fa-money-bill-alt';
      break;
    case '':
      icon = 'fas fa-exclamation-triangle';
      break;
    default:
      icon = 'fa-question';
  }
  return `<i class="${icon}"></i> `;
};

const avatarGenerator = () => {
  const randomNum = Math.floor((Math.random() * 47) + 1);
  let formattedNum = (`0${randomNum}`);
  if (randomNum < 10) { formattedNum = `00${randomNum}`; }
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const randomPic = require(`../../../assets/images/avatars/${formattedNum}.png`);
  return randomPic.default;
};

const changeAvatar = () => {
  const newUrl = avatarGenerator();
  const domString = `<img src="${newUrl}" class="w-100" id="avatar-chooser" data-url="${newUrl}">`;
  utils.printToDom('#chosen-avatar', domString);
};

const addStaffForm = () => {
  const avatar = avatarGenerator();
  const domString = `
  <div class="modal" id="addStaffModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Staff Member</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <form id="staffAddForm" class="px-4 py-3">
          <div class="form-group">
            <label for="addStaffName">Name</label>
            <input type="text" class="form-control" name="addStaffName">
          </div>
          <div class="form-group">
            <label for="addStaffTitle">Position</label>
            <select name="addStaffTitle" id="addStaffTitle" class="form-control start-blank">
              <option value="Dino Handler">Dino Handler</option>
              <option value="Ride Attendant">Ride Attendant</option>
              <option value="Vendor Operator">Vendor Operator</option>
              <option value="">(none)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Profile Pic</label>
            <div class="text-center text-secondary">Click to select another image</div>
            <div id="chosen-avatar">
              <img src="${avatar}" class="w-100" id="avatar-chooser" data-url="${avatar}">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Hire</button>
        </form>

      </div>
    </div>
  </div>
</div>`;
  $('body').on('click', '#avatar-chooser', changeAvatar);
  return domString;
};

const staffCard = (employee) => {
  let domString = `<div class="card staff-card align-items-center m-3${employee.isActive ? ' ' : ' inactive'}" id="${employee.id}">
      <div class="card-body">
        <h5 class="card-title">${employee.name}</h5>
        <p class="card-text text-secondary">${employee.title ? employee.title : 'Park Employee'}</p>
        <img src="${employee.imgUrl}" class="employee-card-photo">`;
  if (employee.assignedTo === '') {
    domString += '<p class="card-text text-danger"><i class="fas fa-exclamation-triangle"></i> currently unassigned</p>';
  } else {
    domString += `<p class="card-text">${jobIcon(employee.assignmentCategory)}assigned to ${employee.assignment.name}</p>`;
  }
  if (checkUser.checkUser()) {
    domString += `
          <div class="links card-text text-center">
            ${employee.isActive ? '<a href="#" class="assignStaff mr-4 card-link"><i class="fas fa-id-card"></i></a>' : ''}
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
  header.headerBuilder('Staff');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addStaffForm());
    $('.start-blank').prop('selectedIndex', -1);
    addButton.buttonDiv('Add New Staff Member');
  }
  const filterButton = `
      <div class="custom-control custom-switch">
        <input class="custom-control-input" type="checkbox" value="" id="unassigned-staff">
        <label class="custom-control-label" for="unassigned-staff">
          See Unassigned Staff
        </label>
      </div>`;
  utils.printToDom('#filterDiv', filterButton);
  let domString = `
    <div class="cardCollection"> 
  `;
  staffData.getStaffWithAssignments()
    .then((allStaff) => {
      allStaff.forEach((employee) => {
        if (employee.isActive) { domString += staffCard(employee); } // remove this line to also display inactive employees
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
    imgUrl: $('#avatar-chooser')[0].dataset.url,
    isActive: true,
    assignedTo: '',
    assignmentCategory: '',
  };
  staffData.addStaff(newStaff).then(() => {
    $('#addStaffModal').modal('hide');
    displayStaff();
  });
};

export default {
  displayStaff, addStaff, unassignedStaff, jobIcon, avatarGenerator,
};
