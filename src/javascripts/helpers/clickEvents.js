import utils from './utils';
import detailCardBuilder from '../components/detailsView/detailCardBuilder';
import editButton from '../components/edit/editButton';

const clickEvents = () => {
  $('body').on('click', '.editCard', editButton.editButtonEvent);
  $('body').on('click', '.viewCard', detailCardBuilder.showDetailedCard);
  $('body').on('click', '.backButton', () => {
    utils.printToDom('#addForm', '');
    $('#addForm').addClass('hide');
    $('#addButtonDiv').removeClass('d-none');
  });
};

export default { clickEvents };
