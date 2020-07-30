import './cardFactoryEquip.scss';

import utils from '../../helpers/utils';
import equipData from '../../helpers/data/equipData';
import checkUser from '../../helpers/data/checkUser';
import staffData from '../../helpers/data/staffData';
import header from '../consoleHeader/consoleHeader';
import addButton from '../addButton/addButton';

const equipIcon = (type) => {
  let icon = '';
  switch (type) {
    case 'Office':
      icon = 'fas fa-laptop';
      break;
    case 'Tool':
      icon = 'fas fa-tools';
      break;
    case 'Safety':
      icon = 'fas fa-exclamation-triangle';
      break;
    case 'Vehicle':
      icon = 'fas fa-truck';
      break;
    default:
      icon = 'fa-question';
  }
  return `<i class="${icon} fa-5x text-secondary m-4"></i>`;
};

// modal version
const addEquipForm = () => {
  const domString = `

  <div class="modal" id="addEquipModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="newEquipModal">New Equipment</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form id="equipAddForm" class="px-4 py-3">
           <div class="form-group">
             <label for="name">Equipment Name</label>
             <input type="text" class="form-control" name="name">
           </div>
           <div class="form-group">
             <label for="type">Equipment Type</label>
             <input type="text" class="form-control" name="type">
          </div>
           <div class="form-group">
             <label for="location">Equipment Location</label>
             <input type="text" class="form-control" name="location">
           </div>         
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div>
  `;
  return domString;
};

const availableStaffForm = (equip, staff) => {
  let domString = '';
  if (equip.assignedTo) {
    domString += `
    <button class="assignEquipOption dropdown-item" type="button" data-equipid="${equip.id}" data-staffid="">Mark As Available</button>
    <div class="dropdown-divider"></div>`;
  }
  staff.forEach((staffMember) => {
    if (staffMember.isActive) {
      domString += `<button class="assignEquipOption dropdown-item${equip.assignedTo === staffMember.id ? ' active' : ''}" 
      type="button" data-equipid="${equip.id}" data-staffid="${staffMember.id}">${staffMember.name}
      </button>`;
    }
  });
  return domString;
};

// Checks for Equipment that have no assigned staff and hides all others

const unattendedEquip = (e) => {
  equipData.getAllEquipment()
    .then((equips) => {
      if (e.target.checked === true) {
        equips.forEach((equip) => {
          if (equip.assignedTo) {
            $(`#${equip.id}`).closest('.card').addClass('hide-assigned');
          }
        });
      } else if (e.target.checked === false) {
        $('.card').removeClass('hide-assigned');
      }
    })
    .catch((err) => console.error('Getting assignees for equipment did not work -> ', err));
};

const displayEquipCollection = () => {
  header.headerBuilder('Equipment');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addEquipForm());
    addButton.buttonDiv('New Equipment');
  }
  staffData.getStaff()
    .then((staff) => {
      equipData.getAllEquipment()
        .then((equipCollectionArr) => {
          let domString = `<div>
          <div class="form-check unassigned-box">
              <input class="form-check-input" type="checkbox" value="" id="unattended-equip">
              <label class="form-check-label" for="unattended-equip">
                See Unattended Equipment
              </label>
            </div>
            <div class="cardCollection"> 
          <div class ="card equipCard align-items-center m-3" style="width: 18rem">
            <div class="card-body">
            <button id="testButton" type="button" class="btn btn-outline-info btn-large">
        Test All Equipment
      </button>
            </div>
          </div>
           
          `;
          equipCollectionArr.forEach((equip) => {
            domString += `
          <div id="${equip.id}" class="card equipCard align-items-center m-3 ${equip.isOperational ? '' : 'disabled'}" style="width: 18rem">
            
            ${equipIcon(equip.type)}
            <div class="card-body">
                <h5 class="card-title">${equip.name}</h5>
                <p class="card-text">location: ${equip.location}</p>
                <p class="card-text">assigned to: ${equip.assignedTo ? (staff.find((staffMember) => staffMember.id === equip.assignedTo)).name : 'Available'}</p>`;
            if (checkUser.checkUser()) {
              domString += `<div class="links card-text text-center"> 
                        <div class="btn-group">
                          <a href="#" class="assignEquip mr-4 card-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user"></i></a>
                          <div class="dropdown-menu dropdown-menu-right">
                          ${availableStaffForm(equip, staff)}
                          </div>
                        </div>
                          <a href="#" class="editEquip mr-4 card-link"><i class="fas fa-pen"></i></a>
                          <a href="#" class="deleteEquip ml-4 card-link"><i class="far fa-trash-alt"></i></a>
                      </div>`;
            }
            domString += `
            </div>
          </div>`;
          });
          domString += '</div>';
          utils.printToDom('#displayCards', domString);
          utils.setState('equipment');
        })
        .catch((err) => console.error(err));
    });
};

const addEquipment = (e) => {
  e.preventDefault();
  const tempEquipOjb = {
    name: e.target.elements.name.value,
    type: e.target.elements.type.value,
    location: e.target.elements.location.value,
    isOperational: true,
  };
  equipData.addEquipment(tempEquipOjb).then(() => {
    $('#addEquipModal').modal('hide');
    displayEquipCollection();
  });
};

export default { displayEquipCollection, addEquipment, unattendedEquip };
