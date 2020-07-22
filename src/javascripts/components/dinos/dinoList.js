import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';
import checkUser from '../../helpers/data/checkUser';

const displayDinos = () => {
  $('#collectionName').text('Dinosaurs');

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

export default { displayDinos };
