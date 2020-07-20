import './cardFactoryEquip.scss';

// create card domstrings here

const makeSingleEquipCard = (equip) => {
  const isTrueSet = (equip.equipOperational === true);
  let backgroundColor;
  if (!isTrueSet) {
    backgroundColor = 'red';
  }
  let domString = `<div id="${equip.id}" class="card align-items-center m-3" style="width: 18rem; background-color: ${backgroundColor};">
  <img src="${equip.equipImgUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Equipment Name: ${equip.equipName}</h5>
    <p class="card-text">Equipment Type: ${equip.equipType}</p>
    <p class="card-text">Equipment Location: ${equip.equipLocation}</p>`;
  if (isTrueSet) {
    domString += '<p class="card-text">Operational: <i class="fas fa-thumbs-up" style="color:green;"></i></p>';
  } else {
    domString += '<p class="card-text">Operational: <i class="fas fa-thumbs-down" style="color:black;"></i></p>';
  }
  domString += `
    <div class="links card-text text-center">
    <a href="#" class="editCard mr-4 card-link hide"><i class="fas fa-pen"></i></a>
    <a href="#" class="viewCard m-4 card-link"><i class="fas fa-search"></i></a>
    <a href="#" class="deleteCard ml-4 card-link hide"><i class="far fa-trash-alt"></i></a>
    </div>
  </div>
</div>`;
  return domString;
};

export default { makeSingleEquipCard };
