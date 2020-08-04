import moment from 'moment';
import monkeyData from '../../helpers/data/monkeyData';
import utils from '../../helpers/utils';
import './chaosLog.scss';

const printChaosLog = () => {
  monkeyData.getMonkeyLog()
    .then((logData) => {
      let domString = `<div id="chaosLogContainer" class="d-flex flex-row">
                          <span id="chaosIcon" class="mx-4"><i class="fas fa-biohazard"></i></span>
                            <div id="chaosItems">
                            <h5>Chaos Monkey Log</h5>
                        `;
      logData.forEach((logEntry) => {
        domString += `<div class="card mb-2">
                        <div class="card-body">
                          ${logEntry.message}<br>${moment(logEntry.dateTime).format('MMMM Do YYYY, h:mm:ss a')}
                        </div>
                      </div>`;
      });
      domString += `</div>
                    </div>
                  </div>`;
      utils.printToDom('#chaosMonkeyLog', domString);
    })
    .catch((err) => console.error(err));
};

const animateLog = () => {
  if ($('#chaosMonkeyLog').hasClass('chaosSlideIn')) {
    $('#chaosMonkeyLog').removeClass('chaosSlideIn').addClass('chaosSlideOut');
  } else if ($('#chaosMonkeyLog').hasClass('chaosSlideOut')) {
    $('#chaosMonkeyLog').removeClass('chaosSlideOut').addClass('chaosSlideIn');
  } else {
    $('#chaosMonkeyLog').addClass('chaosSlideOut');
  }
};

export default { printChaosLog, animateLog };
