import './cardFactoryEquip.scss';

import utils from '../../helpers/utils';
import equipData from '../../helpers/data/equipData';
import checkUser from '../../helpers/data/checkUser';

const displayEquipCollection = () => {
  $('#collectionName').text('Equipment');

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
                        <a href="#" class="editCard mr-4 card-link "><i class="fas fa-pen"></i></a>
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

export default { displayEquipCollection };
