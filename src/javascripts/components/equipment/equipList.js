import './cardFactoryEquip.scss';

import utils from '../../helpers/utils';
import equipData from '../../helpers/data/equipData';
import checkUser from '../../helpers/data/checkUser';
import staffData from '../../helpers/data/staffData';

const addEquipForm = () => {
  const domString = `
  <form id="equipAddForm" class="px-4 py-3">
    <div class="form-group">
      <label for="name">Equipment Name</label>
      <input type="text" class="form-control" name="name">
    </div>
    <div class="form-group">
    <label for="type">Type:</label>
    <select id="cars" class="form-control" name="type">
      <option value="Office">Office</option>
      <option value="Tool">Tool</option>
      <option value="Safety">Safety</option>
      <option value="Vehicle">Vehicle</option>
    </select>
    </div>
    <div class="form-group">
      <label for="imgUrl">Equipment Image URL</label>
      <input type="url" class="form-control" name="imgUrl">
    </div>
    <div class="form-group">
      <label for="size">Equipment Location</label>
      <input type="text" class="form-control" name="size">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`;
  return domString;
};

const availableUsersForm = (equip, staff) => {
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

const displayEquipCollection = () => {
  $('#addForm').addClass('hide');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addEquipForm());
  }
  staffData.getStaff()
    .then((staff) => {
      equipData.getAllEquipment()
        .then((equipCollectionArr) => {
          let domString = '<div class="d-flex justify-content-center flex-wrap">';
          equipCollectionArr.forEach((equip) => {
            domString += `
          <div id="${equip.id}" class="card equipCard align-items-center m-3 ${equip.isOperational ? '' : 'disabled'}" style="width: 18rem">
            <img src="${equip.imgUrl}" class="card-img-top" alt="..." >
            <div class="card-body">
                <h5 class="card-title">${equip.name}</h5>
                <p class="card-text">location: ${equip.location}</p>
                <p class="card-text">assigned to: ${equip.assignedTo ? (staff.find((staffMember) => staffMember.id === equip.assignedTo)).name : 'Available'}</p>`;
            if (checkUser.checkUser()) {
              domString += `<div class="links card-text text-center"> 
                        <div class="btn-group">
                          <a href="#" class="assignEquip mr-4 card-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user"></i></a>
                          <div class="dropdown-menu dropdown-menu-right">
                          ${availableUsersForm(equip, staff)}
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
        })
        .catch((err) => console.error(err));
    });
};

const addEquipment = (e) => {
  e.preventDefault();
  const tempEquipOjb = {
    name: e.target.elements.name.value,
    type: e.target.elements.type.value,
    imgUrl: e.target.elements.imgUrl.value,
    location: e.target.elements.size.value,
    isOperational: true,
  };
  equipData.addEquipment(tempEquipOjb).then(() => {
    displayEquipCollection();
    $('#addForm').addClass('hide');
  });
};

export default { displayEquipCollection, addEquipment };
