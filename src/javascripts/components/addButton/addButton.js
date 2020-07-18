import addForms from '../addForms/addForms';
import utils from '../../helpers/utils';

const whichform = (id) => {
  console.warn(id);
  switch (id) {
    case 'dinosaurs':
      return addForms.dinoAddForm();
    default:
      return addForms.junkTestForm();
  }
};

const addButtonEvent = () => {
  console.warn('button clicked');
  const form = whichform(utils.getActive());
  console.warn(form);
  utils.printToDom('#addForm', form);
};

export default { addButtonEvent };
