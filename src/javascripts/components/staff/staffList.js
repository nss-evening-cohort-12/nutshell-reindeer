import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import './staffList.scss';
import checkUser from '../../helpers/data/checkUser';

const addStaffForm = () => {
  const domString = `
  <div class="modal fade" id="addStaffModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

const staffCard = (collection) => {
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addStaffForm());
  }
  let domString = `<div class="card staff-card align-items-center m-3${collection.isActive ? ' ' : ' kidnapped'}" id="${collection.id}">
  <img src="${collection.imgUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${collection.name}</h5>
    <p class="card-text">${collection.title}</p>`;
  if (!collection.isActive) {
    domString += '<p class="card-text">INACTIVE</p>';
  } else {
    domString += '<p class="card-text">Active</p>';
  }
  if (checkUser.checkUser()) {
    domString += `
      <div class="links card-text text-center">
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

const addStaff = (e) => {
  e.preventDefault();
  $('#addStaffModal').modal('hide');
  const newStaff = {
    name: e.target.elements.addStaffName.value,
    title: e.target.elements.addStaffTitle.value,
    imgUrl: e.target.elements.addStaffImgUrl.value,
    isActive: true,
  };
  staffData.addStaff(newStaff).then(() => {
    displayStaff();
  });
};

export default { displayStaff, addStaff };
