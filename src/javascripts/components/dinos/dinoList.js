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
  dinoData.getDinos()
    .then((dinosArr) => {
      let domString = '<div class="d-flex flex-wrap">';
      dinosArr.forEach((dino) => {
        domString += `
        <div class="card align-items-center m-3" style="width: 18rem;" id="${dino.id}">
          <img src="${dino.dinoImgUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Dinosauar Name: ${dino.dinoName}</h5>
            <p class="card-text">Dinosaur Type: ${dino.dinoType}</p>`;
        if (checkUser.checkUser()) {
          domString += `<div class="links card-text text-center">
                <a href="#" class="editCard mr-4 card-link "><i class="fas fa-pen"></i></a>
                <a href="#" class="deleteCard ml-4 card-link"><i class="far fa-trash-alt"></i></a>
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
  const tempDinoOjb = {
    dinoName: e.target.elements.addDinoName.value,
    dinoType: e.target.elements.addDinoType.value,
    dinoImgUrl: e.target.elements.addDinoImgUrl.value,
    dinoSize: e.target.elements.addDinoSize.value,
  };
  dinoData.addDino(tempDinoOjb).then(() => {
    displayDinos();
    $('#addForm').addClass('hide');
  });
};

export default { displayDinos, addDino };
