import equipData from '../../helpers/data/equipData';
import equipList from './equipList';

const deleteEquip = (e) => {
  const collectionId = e.target.closest('.card').id;
  equipData.deleteEquipById(collectionId)
    .then(() => {
      equipList.displayEquipCollection();
    })
    .catch((err) => console.error('could not delete equipment', err));
};

export default { deleteEquip };
