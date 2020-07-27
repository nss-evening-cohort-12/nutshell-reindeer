import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';
import checkUser from '../../helpers/data/checkUser';

const addDinoForm = () => {
  const domString = `
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
  </form>`;
  return domString;
};

const displayDinos = () => {
  $('#collectionName').text('Dinosaurs');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addDinoForm());
  }
  dinoData.getDinosWithHandlers()
    .then((dinosArr) => {
      let domString = '<div class="d-flex flex-wrap">';
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
                <i class="fas fa-pen editDino"></i>
                <i class="far fa-trash-alt"></i>
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
  const tempDinoObj = {
    name: e.target.elements.addDinoName.value,
    dinoType: e.target.elements.addDinoType.value,
    dinoImgUrl: e.target.elements.addDinoImgUrl.value,
    dinoSize: e.target.elements.addDinoSize.value,
    rideOperational: true,
  };
  dinoData.addDino(tempDinoObj).then(() => {
    displayDinos();
    $('#addForm').addClass('hide');
  });
};

export default { displayDinos, addDino };
