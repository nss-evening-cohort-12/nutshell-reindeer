import addForms from '../addForms/addForms';
import utils from '../../helpers/utils';
import addDino from '../addDino/addDino';

const addFunction = (e) => {
  e.preventDefault();
  const collection = utils.getActive();
  switch (collection) {
    case 'dinosaurs':
      addDino.addDino();
      break;
    default:
      console.warn('no add function yet');
  }
};

const whichform = (id) => {
  switch (id) {
    case 'dinosaurs':
      return addForms.dinoAddForm();
    default:
      return addForms.junkTestForm();
  }
};

const addButtonEvent = () => {
  const addformElement = $('#addForm');
  const form = whichform(utils.getActive());
  utils.printToDom('#addForm', form);
  if (addformElement.hasClass('hide')) {
    addformElement.removeClass('hide');
  } else {
    addformElement.addClass('hide');
  }
  $('#submitAdd').click(addFunction);
};

const hideaddbutton = () => $('#addForm').addClass('hide');

export default { addButtonEvent, hideaddbutton };
