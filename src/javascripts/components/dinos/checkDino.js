import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';

import './dinoCards.scss';

const runDinoModal = () => {
  dinoData.getDinosWithHandlers()
    .then((dinos) => {
      let domString = `
        <div class="modal check-dino-modal" id="check-dino-modal" tabindex="-1" role="dialog" aria-labelledby="check-dino-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="check-dino-label"><i class="fas fa-exclamation-triangle pr-2"></i> Dinos need more handlers!</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" id="close-dino-modal">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <h5>Assign a Handler to these Dinos:</h5>
                <div class="dinos">
      `;
      dinos.forEach((dino) => {
        if (dino.assignees.length <= 1) {
          domString += `
            <h6>${dino.name}</h6>
          `;
        }
      });
      domString += `
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success">Assign Handlers</button>
              </div>
            </div>
          </div>
        </div>
      `;
      utils.printToDom('#check-dino', domString);
      $('#check-dino-modal').modal('show');
      $('body').on('click', '#close-dino-modal', () => { $('div.modal-backdrop').removeClass('modal-backdrop'); });
    })
    .catch((err) => console.error('Getting handlers for dinos did not work -> ', err));
};

const checkDinoHandlers = () => {
  dinoData.getDinosWithHandlers()
    .then((dinos) => {
      dinos.forEach((dino) => {
        if (dino.assignees.length <= 1) {
          runDinoModal();
        }
      });
    })
    .catch((err) => console.error('Getting handlers for dino modal did not work -> ', err));
};

export default { checkDinoHandlers };
