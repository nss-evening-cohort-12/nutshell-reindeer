import './cardFactoryEquip.scss';

import utils from '../../helpers/utils';
import equipData from '../../helpers/data/equipData';
import checkUser from '../../helpers/data/checkUser';

const addEquipForm = () => {
  const domString = `
  <form id="equipAddForm" class="px-4 py-3">
    <div class="form-group">
      <label for="equipName">Equipment Name</label>
      <input type="text" class="form-control" name="equipName">
    </div>
    <div class="form-group">
      <label for="equipType">Equipment Type</label>
      <input type="text" class="form-control" name="equipType">
    </div>
    <div class="form-group">
      <label for="equipImgUrl">Equipment Image URL</label>
      <input type="url" class="form-control" name="equipImgUrl">
    </div>
    <div class="form-group">
      <label for="equipSize">Equipment Location</label>
      <input type="text" class="form-control" name="equipSize">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`;
  return domString;
};

const displayEquipCollection = () => {
  $('#collectionName').text('Equipment');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addEquipForm());
  }
  equipData.getAllEquipment().then((equipCollectionArr) => {
    let domString = '<div class="d-flex justify-content-center flex-wrap">';
    equipCollectionArr.forEach((equip) => {
      domString += `
        <div id="${equip.id}" class="card equipCard align-items-center m-3 ${equip.equipOperational ? '' : 'disabled'}" style="width: 18rem">
          <img src="${equip.equipImgUrl}" class="card-img-top" alt="..." >
          <div class="card-body">
              <h5 class="card-title">Equipment Name: ${equip.equipName}</h5>
              <p class="card-text">Equipment Type: ${equip.equipType}</p>
              <p class="card-text">Equipment Location: ${equip.equipLocation}</p>`;
      if (checkUser.checkUser()) {
        domString += `<div class="links card-text text-center">
                        <a href="#" class="editEquip mr-4 card-link "><i class="fas fa-pen"></i></a>
                        <a href="#" class="deleteCard ml-4 card-link"><i class="far fa-trash-alt"></i></a>
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
};

const addEquipment = (e) => {
  e.preventDefault();
  const tempEquipOjb = {
    equipName: e.target.elements.equipName.value,
    equipType: e.target.elements.equipType.value,
    equipImgUrl: e.target.elements.equipImgUrl.value,
    equipLocation: e.target.elements.equipSize.value,
    equipOperational: true,
  };
  equipData.addEquipment(tempEquipOjb).then(() => {
    displayEquipCollection();
    $('#addForm').addClass('hide');
  });
};

export default { displayEquipCollection, addEquipment };
