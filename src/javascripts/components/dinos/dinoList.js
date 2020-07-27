import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';
import checkUser from '../../helpers/data/checkUser';

const addDinoForm = () => {
  const domString = `
  <div class="modal fade" id="addDinoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

const displayDinos = () => {
  $('#collectionName').text('Dinosaurs');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addDinoForm());
  }
  dinoData.getDinos()
    .then((dinosArr) => {
      let domString = '<div class="d-flex flex-wrap">';
      dinosArr.forEach((dino) => {
        domString += `
        <div class="card align-items-center m-3" style="width: 18rem;" id="${dino.id}">
          <img src="${dino.dinoImgUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Dinosaur Name: ${dino.dinoName}</h5>
            <p class="card-text">Dinosaur Type: ${dino.dinoType}</p>`;
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
    })
    .catch((err) => console.error(err));
};

const addDino = (e) => {
  e.preventDefault();
  $('#addDinoModal').modal('hide');

  const tempDinoObj = {
    dinoName: e.target.elements.addDinoName.value,
    dinoType: e.target.elements.addDinoType.value,
    dinoImgUrl: e.target.elements.addDinoImgUrl.value,
    dinoSize: e.target.elements.addDinoSize.value,
    rideOperational: true,
  };
  dinoData.addDino(tempDinoObj).then(() => {
    displayDinos();
  });
};

export default { displayDinos, addDino };
