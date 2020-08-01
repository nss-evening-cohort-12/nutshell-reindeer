import './schedule.scss';
import schedules from '../../helpers/data/scheduleData';
import staff from '../../helpers/data/staffData';
import utils from '../../helpers/utils';
import consoleHeader from '../consoleHeader/consoleHeader';

const printSchedule = () => {
  consoleHeader.headerBuilder('Schedule');
  schedules.getSchedule()
    .then((allSched) => {
      staff.getStaff()
        .then((allStaff) => {
          let domString = `<div class="d-flex justify-content-center flex-wrap" id="scheduledCards">
                            <div id="unscheduled" class="daysOfWeek mx-2 mt-4">
                              <h4 class="child-elements no-drop">Unscheduled</h4>
                                <div class="should-scroll drop-here">`;
          allStaff.forEach((unschedStaff) => {
            const isUnsched = allSched.find((s) => s.staffId === unschedStaff.id);
            if (!isUnsched) {
              domString += `<div id="${unschedStaff.id}" class="card mt-2 dragItem" draggable="true">
                              <div class="card-body d-flex flex-row justify-content-start align-items-center child-elements">
                                <img src="${unschedStaff.imgUrl}" draggable="false">
                                <span class="ml-5 child-elements">${unschedStaff.name}</span>
                              </div>
                            </div>`;
            }
          });
          domString += '</div></div>';
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
          days.forEach((day) => {
            const scheduledStaff = allSched.filter((sched) => sched.day === day); // get all sched for this day
            domString += `<div id="${day}" class="daysOfWeek mx-2 mt-4 scheduled">
                            <h4 class="child-elements no-drop">${day}</h4>
                              <div class="should-scroll drop-here">`;
            scheduledStaff.forEach((staffInSchedule) => { // Loop through filtered schedules
              const staffMemberInfo = allStaff.find((foundStaff) => foundStaff.id === staffInSchedule.staffId); // Get Name and Id of staff member
              domString += `<div id="${staffMemberInfo.id}" data-sched="${staffInSchedule.id}" class="card mt-2 dragItem" draggable="true">
                              <div class="card-body d-flex flex-row justify-content-start align-items-center child-elements">
                                <img src="${staffMemberInfo.imgUrl}" draggable="false" class="child-elements">
                                <span class="ml-5 child-elements">${staffMemberInfo.name}</span>
                              </div>
                            </div>`;
            });

            domString += '</div></div>'; // end of day div
          });
          domString += '</div>'; // end of container div
          utils.printToDom('#displayCards', domString);
          utils.setState('schedule');
        });
    })
    .catch((err) => console.error(err));
};

const dragstart = (e) => {
  e.originalEvent.dataTransfer.setData('staffId', e.target.id);
  e.originalEvent.dataTransfer.setData('origDay', e.target.closest('.daysOfWeek').id);
  e.originalEvent.dataTransfer.setData('schedId', e.currentTarget.dataset.sched);
  e.currentTarget.style.border = 'dashed';
  console.error('dragstart: ', e.originalEvent.dataTransfer.getData('staffId'));
  console.error('dragstart: ', e.originalEvent.dataTransfer.getData('origday'));
  console.error('dragstart: ', e.originalEvent.dataTransfer.getData('schedId'));
};

const drag = () => {
  // not needed
};

const dragend = (e) => {
  e.currentTarget.attributeStyleMap.clear();
};

const dragenter = (e) => { // drop target
  e.preventDefault();
  e.currentTarget.style.transform = 'scale(1.2)';
};

const dragleave = (e) => { // drop target
  e.currentTarget.attributeStyleMap.clear();
};

const dragover = (e) => { // drop target
  e.preventDefault();
  e.currentTarget.style.transform = 'scale(1.2)';
};

const drop = (e) => { // drop target
  if (e.target.closest('.drop-here')) {
    e.preventDefault();
    const staffId = e.originalEvent.dataTransfer.getData('staffId');
    const origDay = e.originalEvent.dataTransfer.getData('origDay');
    const schedId = e.originalEvent.dataTransfer.getData('schedid');
    const dropZone = e.target.closest('.drop-here');
    const dropDay = dropZone.closest('.daysOfWeek').id;
    if (dropDay === 'unscheduled' && origDay !== 'unscheduled') { // M-F to unscheduled
      schedules.deleteScheduleById(schedId)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          printSchedule();
          e.originalEvent.dataTransfer.clearData();
          e.currentTarget.attributeStyleMap.clear();
        })
        .catch((err) => console.error(err));
    } else if (dropDay === 'unscheduled' && origDay === 'unscheduled') { // Unscheduled to itself
      console.error('nothing to update');
    } else if (dropDay === origDay) { // Unscheduled to itself
      console.error('nothing to update');
    } else if (dropDay !== 'unscheduled' && origDay === 'unscheduled') { // Unscheduled to M-F
      const newSched = { staffId, day: dropDay };
      schedules.addSchedule(newSched)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          printSchedule();
          e.originalEvent.dataTransfer.clearData();
          e.currentTarget.attributeStyleMap.clear();
        })
        .catch((err) => console.error(err));
    } else if (dropDay !== 'unscheduled' && origDay !== 'unscheduled') { // M-F to M-F
      const newSched = { day: dropDay };
      schedules.patchSchedule(schedId, newSched)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          printSchedule();
          e.originalEvent.dataTransfer.clearData();
          e.currentTarget.attributeStyleMap.clear();
        })
        .catch((err) => console.error(err));
    }
    // dropZone.appendChild(staffMember);
    e.originalEvent.dataTransfer.clearData();
    e.currentTarget.attributeStyleMap.clear();
  } else {
    e.preventDefault();
    console.error('no drop here');
    e.originalEvent.dataTransfer.clearData();
    e.currentTarget.attributeStyleMap.clear();
  }
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
