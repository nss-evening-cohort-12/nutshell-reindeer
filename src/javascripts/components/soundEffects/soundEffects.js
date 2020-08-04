import theme from '../../../assets/sounds/jurrasicParkTheme.mp3';
import paper from '../../../assets/sounds/paper.mp3';
import dino from '../../../assets/sounds/tRexRoar.mp3';
import drill from '../../../assets/sounds/drill.mp3';
import vendor from '../../../assets/sounds/vendor.mp3';
import ride from '../../../assets/sounds/coasterScream.mp3';
import breakRoom from '../../../assets/sounds/breakRoom.mp3';

const themePlay = (path) => {
  setTimeout(() => $('#sounds').html(path), 600); // 2s animation after fade in monkey animation
};

const whichTheme = (e) => {
  console.error(e.target.id);
  const { id } = e.target;
  let path = '';
  switch (id) {
    case 'logo':
      path = `<audio src="${theme}" autoplay><audio>`;
      break;
    case 'dinosaurs':
      path = `<audio src="${dino}" autoplay><audio>`;
      break;
    case 'staff':
      path = `<audio src="${breakRoom}" autoplay><audio>`;
      break;
    case 'equipment':
      path = `<audio src="${drill}" autoplay><audio>`;
      break;
    case 'rides':
      path = `<audio src="${ride}" autoplay><audio>`;
      break;
    case 'vendors':
      path = `<audio src="${vendor}" autoplay><audio>`;
      break;
    case 'schedule':
      path = `<audio src="${paper}" autoplay><audio>`;
      break;

    // eslint-disable-next-line no-unused-expressions
    default: '<audio src="" autoplay><audio>';
      break;
  }

  themePlay(path);
};

export default { whichTheme };
