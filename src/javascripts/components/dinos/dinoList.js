import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';
import checkUser from '../../helpers/data/checkUser';
import header from '../consoleHeader/consoleHeader';
import addButton from '../addButton/addButton';
import './dinoCards.scss';

const avatarGenerator = (dinoType) => {
  let max = 0;
  switch (dinoType) {
    case 'Diplodocus':
      max = 5;
      break;
    case 'Pterodactyl':
      max = 5;
      break;
    case 'Stegosaurus':
      max = 4;
      break;
    case 'Triceratops':
      max = 1;
      break;
    case 'T-Rex':
      max = 1;
      break;
    default:
      max = 1;
  }
  const randomNum = Math.floor((Math.random() * max) + 1);
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const randomPic = require(`../../../assets/images/dinos/${dinoType}/${randomNum}.png`);
  return randomPic.default;
};

const changeAvatar = () => {
  const dinoType = $('#addDinoType').val();
  const newUrl = avatarGenerator(dinoType);
  const domString = `<img src="${newUrl}" class="w-100" id="avatar-chooser" data-url="${newUrl}">`;
  utils.printToDom('#chosen-dino-avatar', domString);
  $('#chosen-dino-avatar').removeClass('hide-assigned');
};

const addDinoForm = () => {
  const domString = `
  <div class="modal" id="addDinoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Dinosaur</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="dinoAddForm" class="px-4 py-3">
            <div class="form-group">
              <label for="addDinoName">Name</label>
              <input type="text" class="form-control" name="addDinoName">
            </div>

            <div class="form-group">
            <label for="addDinoType">Type</label>
            <select name="addDinoType" id="addDinoType" class="form-control start-blank">
              <option value="Diplodocus">Diplodocus</option>
              <option value="Pterodactyl">Pterodactyl</option>
              <option value="Stegosaurus">Stegosaurus</option>
              <option value="T-Rex">T-Rex</option>
              <option value="Triceratops">Triceratops</option>

            </select>
          </div>

          <div class="form-group">
            <label>Profile Pic</label>
            <div id="chosen-dino-avatar" class="hide-assigned">
              
            </div>
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
        <div class="custom-control custom-switch">
          <input class="custom-control-input" type="checkbox" value="" id="unattended-dinos">
          <label class="custom-control-label" for="unattended-dinos">
            See Unattended Dinos
          </label>
        </div>
        <div class="cardCollection"> 
      `;

      dinosArr.forEach((dino) => {
        let assignees = '';
        if (dino.assignees.length > 0) {
          for (let i = 0; i < dino.assignees.length; i += 1) {
            assignees += dino.assignees[i].name;
            if (i + 1 < dino.assignees.length && dino.assignees.length !== 1) assignees += ', ';
          }
        }

        // dinosArr.forEach((dino) => {
        //   let handlers = 'unassigned';
        //   if (dino.assignees.length > 0) {
        //     handlers = '';
        //     dino.assignees.forEach((assignee) => {
        //       handlers += `<p>${assignee.name}`;
        //     });
        //   }

        domString += `
        <div class="card align-items-center m-3 dino-card" id="${dino.id}">
          <img src="${dino.imgUrl}" class="dino-card-photo">
          <div class="card-body">
            <h5 class="card-title">${dino.name}</h5>
            <p class="card-text text-secondary">${dino.type}</p>
            <p class="card-text">${assignees ? `Current Handlers: 
            <br>${assignees}` : '<span class="text-danger" style="line-height: 3;"><i class="fas fa-exclamation-triangle"></i> currently unassigned</span>'}</p>`;
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
      $('.start-blank').prop('selectedIndex', -1);
    })
    .catch((err) => console.error(err));
};

const addDino = (e) => {
  e.preventDefault();

  const tempDinoObj = {
    name: e.target.elements.addDinoName.value,
    type: e.target.elements.addDinoType.value,
    imgUrl: $('#avatar-chooser')[0].dataset.url,
  };
  dinoData.addDino(tempDinoObj).then(() => {
    $('#addDinoModal').modal('hide');
    displayDinos();
  });
};

export default {
  displayDinos, addDino, unattendedDinos, changeAvatar, avatarGenerator,
};
