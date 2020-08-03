import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import jobsData from '../../helpers/data/jobsData';
// import './dinoCards.scss';

// Checks staff selections that still need to be updated and clears modal if nothing is found

const staffSelections = () => {
  let domString = '';

  staffData.getStaff()
    .then((staff) => {
      dinoData.getDinosWithHandlers()
        .then((dinos) => {
          const found = dinos.find((oneDino) => oneDino.assignees.length <= 1);
          if (found !== undefined) {
            dinos.forEach((dino) => {
              if (dino.assignees.length <= 1) {
                domString += `
                <div class="dino-section">
                  <p class="handler"><span class="dino-name">${dino.name}</span> needs ${dino.assignees.length === 0 ? '<b>2</b> more handlers' : '<b>1</b> more handler'}</p>
                  <div class="update-area">
                    <select name="update-dino-handler" id="update-dino-handler" class="form-control ${dino.id}" data-dino-to-change=${dino.id}>`;

                staff.forEach((person) => {
                  if (person.assignedTo === '' && person.isActive) {
                    domString += `<option id="${person.id}">${!person.name ? 'Park Employee' : person.name}</option>`;
                  }
                });

                domString += `
                    </select>
                  </div>
                </div>
              `;
              }
            });
            utils.printToDom('#dino-modal', domString);
            dinos.forEach((dino) => {
              $(`.${dino.id}`).prop('selectedIndex', -1);
            });
          } else { utils.clearModal(); }
        });
    })
    .catch((err) => console.error(err));
};

// Updates the assignment data for Staff

const updateDinoHandlers = (e) => {
  staffData.getStaff()
    .then((staff) => {
      dinoData.getDinosWithHandlers()
        .then((dinos) => {
          dinos.forEach((dino) => {
            if (dino.assignees.length <= 1 && dino.id === e.target.dataset.dinoToChange) {
              staff.forEach((person) => {
                if ($(e.target).val() === person.name) {
                  const staffId = person.id;
                  const department = 'dinosaurs';
                  const job = dino.id;

                  jobsData.assignNewJob(staffId, department, job)
                    .then(() => {
                      staffSelections();
                    });
                }
              });
            }
          });
        });
    })
    .catch((err) => console.error(err));
};

// Displays the modal

const runDinoModal = () => {
  const domString = `
    <div class="modal check-dino-modal" id="check-dino-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="check-dino-label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="check-dino-label"><i class="fas fa-exclamation-triangle pr-2"></i> Dinos on the loose!</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" id="close-dino-modal">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="dinos" id="dino-modal">
              ${staffSelections()}
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  utils.printToDom('#check-dino', domString);
  $('#check-dino-modal').modal('show');
  $('body').on('click', '#close-dino-modal', utils.clearModal);
};

// Checks Dino handlers to see if the modal needs to be run

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

export default { checkDinoHandlers, updateDinoHandlers };
