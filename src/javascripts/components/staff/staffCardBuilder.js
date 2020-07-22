import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import './staffCardBuilder.scss';
import checkUser from '../../helpers/data/checkUser';

const staffCard = (collection) => {
  let domString = `<div class="card staff-card align-items-center m-3${collection.kidnap ? ' kidnapped' : ''}" id="${collection.id}">
  <img src="${collection.staffImgUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${collection.staffName}</h5>
    <p class="card-text">${collection.staffTitle}</p>`;
  if (collection.kidnapped) {
    domString += '<p class="card-text">kidnapped: <i class="fas fa-ghost" style="color:black;"></i></p>';
  } else {
    domString += '<p class="card-text">kidnapped: <i class="fab fa-angellist" style="color:green;"></i></p>';
  }
  if (checkUser.checkUser()) {
    domString += `
      <div class="links card-text text-center">
        <a href="#" class="editCard mr-4 card-link hide"><i class="fas fa-pen"></i></a>
        <a href="#" class="deleteCard ml-4 card-link hide"><i class="far fa-trash-alt"></i></a>
      </div>`;
  }
  domString += `
  </div>
</div>`;
  return domString;
};

const displayStaff = () => {
  $('#collectionName').text('Staff');
  staffData.getStaff()
    .then((allStaff) => {
      let domString = '<div class="d-flex flex-wrap">';
      allStaff.forEach((staff) => {
        domString += staffCard(staff);
      });
      domString += '</div>';
      utils.printToDom('#displayCards', domString);
    })
    .catch((err) => console.error(err));
};

export default { displayStaff };
