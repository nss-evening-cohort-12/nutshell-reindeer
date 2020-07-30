import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';
import checkUser from '../../helpers/data/checkUser';
import header from '../consoleHeader/consoleHeader';
import addButton from '../addButton/addButton';

const addDinoForm = () => {
  const domString = `
  <div class="modal" id="addDinoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Dino</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="dinoAddForm" class="px-4 py-3">
            <div class="form-group">
              <label for="addDinoName">Dinosaur Name</label>
              <input type="text" class="form-control" name="addDinoName">
            </div>
            <div class="form-group">
              <label for="addDinoType">Dinosaur Type</label>
              <input type="text" class="form-control" name="addDinoType">
            </div>
            <div class="form-group">
              <label for="addDinoImgUrl">Dinosaur Image URL</label>
              <input type="url" class="form-control" name="addDinoImgUrl">
            </div>
            <div class="form-group">
              <label for="addDinoSize">Dinosaur Size</label>
              <input type="text" class="form-control" name="addDinoSize">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>`;
  return domString;
};

// Checks for Dinos that have 1 or less handler, hiding all others

const unattendedDinos = (e) => {
  dinoData.getDinosWithHandlers()
    .then((dinos) => {
      if (e.target.checked === true) {
        dinos.forEach((dino) => {
          if (dino.assignees.length > 1) {
            $(`#${dino.id}`).closest('.card').addClass('hide-assigned');
          }
        });
      } else if (e.target.checked === false) {
        $('.card').removeClass('hide-assigned');
      }
    })
    .catch((err) => console.error('Getting handlers for dinos did not work -> ', err));
};

// const dinoHeader = () => {
//   const domString = '';
//   $('#collectionName').text('Dinosaurs');
// };

const displayDinos = () => {
  header.headerBuilder('Dinosaurs');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addDinoForm());
    addButton.buttonDiv('Capture New Dinosaur');
  }
  dinoData.getDinosWithHandlers()
    .then((dinosArr) => {
      let domString = `
        <div class="form-check unassigned-box">
          <input class="form-check-input" type="checkbox" value="" id="unattended-dinos">
          <label class="form-check-label" for="unattended-dinos">
            See Unattended Dinos
          </label>
        </div>
        <div class="cardCollection"> 
      `;
      dinosArr.forEach((dino) => {
        let handlers = 'unassigned';
        if (dino.assignees.length > 0) {
          handlers = '';
          dino.assignees.forEach((assignee) => {
            handlers += `<p>${assignee.name}`;
          });
        }
        domString += `
        <div class="card align-items-center m-3" style="width: 18rem;" id="${dino.id}">
          <img src="${dino.dinoImgUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Dinosaur Name: ${dino.name}</h5>
            <p class="card-text">Dinosaur Type: ${dino.dinoType}</p>
            <p class="card-text">Current Handlers: 
            ${handlers}</p>`;
        if (checkUser.checkUser()) {
          domString += `<div class="links card-text text-center">
                <a href="#" class="editDino mr-4 card-link "><i class="fas fa-pen"></i></a>
                <a href="#" class="deleteDino ml-4 card-link"><i class="far fa-trash-alt"></i></a>
            </div>`;
        }
        domString += `</div>
        </div>`;
      });
      domString += '</div>';
      utils.printToDom('#displayCards', domString);
      utils.setState('dinos');
    })
    .catch((err) => console.error(err));
};

const addDino = (e) => {
  e.preventDefault();

  const tempDinoObj = {
    name: e.target.elements.addDinoName.value,
    dinoType: e.target.elements.addDinoType.value,
    dinoImgUrl: e.target.elements.addDinoImgUrl.value,
    dinoSize: e.target.elements.addDinoSize.value,
    rideOperational: true,
  };
  dinoData.addDino(tempDinoObj).then(() => {
    $('#addDinoModal').modal('hide');
    displayDinos();
  });
};

export default { displayDinos, addDino, unattendedDinos };
