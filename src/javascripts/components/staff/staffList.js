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
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`;
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
          <a href="#" class="assignStaff mr-4 card-link"><i class="fas fa-calendar-plus"></i></a>
            <a href="#" class="editStaff mr-4 card-link"><i class="fas fa-pen"></i></a>
            <a href="#" class="deleteStaff ml-4 card-link"><i class="far fa-trash-alt"></i></a>
          </div>`;
  }
  domString += `
      </div>
    </div>`;
  return domString;
};

const displayStaff = () => {
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addStaffForm());
  }
  let domString = '<div class="d-flex flex-wrap">';
  staffData.getStaffWithAssignments()
    .then((allStaff) => {
      allStaff.forEach((employee) => {
        domString += staffCard(employee);
      });
      domString += '</div>';
      utils.printToDom('#displayCards', domString);
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
    displayStaff();
    $('#addForm').addClass('hide');
  });
};

export default { displayStaff, addStaff };
