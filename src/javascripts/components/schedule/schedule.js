import './schedule.scss';
import schedules from '../../helpers/data/scheduleData';
import staff from '../../helpers/data/staffData';
import utils from '../../helpers/utils';

const dragstart = (e) => {
  e.originalEvent.dataTransfer.setData('staffId', e.target.id);
  e.currentTarget.style.border = 'dashed';
  console.error('dragstart: ', e.originalEvent.dataTransfer.getData('staffId'));
};

const drag = () => {
  // not needed
};

const dragend = (e) => {
  e.currentTarget.attributeStyleMap.delete('border');
};

const dragenter = (e) => { // drop target
  e.preventDefault();
  e.currentTarget.style.border = '2px solid black';
};

const dragleave = (e) => { // drop target
  e.currentTarget.attributeStyleMap.delete('border');
};

const dragover = (e) => { // drop target
  e.preventDefault();
  e.currentTarget.style.border = '2px solid black';
};

const drop = (e) => { // drop target
  const staffId = e.originalEvent.dataTransfer.getData('staffId');
  const staffMember = document.getElementById(staffId);
  const dropZone = e.target.closest('.drop-here');
  dropZone.appendChild(staffMember);
  e.originalEvent.dataTransfer.clearData();
  e.currentTarget.attributeStyleMap.delete('border');
};

const printSchedule = () => {
  schedules.getSchedule()
    .then((allSched) => {
      staff.getStaff()
        .then((allStaff) => {
          let domString = '<div class="d-flex justify-content-around" id="scheduledCards">';
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
          days.forEach((day) => {
            const scheduledStaff = allSched.filter((sched) => sched.day === day); // get all sched for this day
            domString += `<div id="${day}" class="card daysOfWeek">
                            <div class="card-body drop-here">
                              <h2>${day}</h2>`;
            scheduledStaff.forEach((staffInSchedule) => { // Loop through filtered schedules
              const staffMemberInfo = allStaff.find((foundStaff) => foundStaff.id === staffInSchedule.staffId); // Get Name and Id of staff member
              domString += `<div id="${staffMemberInfo.id}" class="card mt-5 dragItem" draggable="true">
                              <div class="card-body">
                                <img src="${staffMemberInfo.imgUrl}">
                                ${staffMemberInfo.name}
                              </div>
                            </div>`;
            });

            domString += '</div></div>'; // end of day div
          });
          domString += '</div>'; // end of container div
          utils.printToDom('#displayCards', domString);
        });
    })
    .catch((err) => console.error(err));
};

export default {
  printSchedule,
  drag,
  dragend,
  dragenter,
  dragleave,
  dragover,
  dragstart,
  drop,
};
