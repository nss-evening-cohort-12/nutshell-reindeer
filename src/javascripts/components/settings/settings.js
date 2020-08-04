import utils from '../../helpers/utils';
import settingsData from '../../helpers/data/settingsData';
import './settings.scss';

const applySettings = (settings) => {
  // console.warn('calling settings', settings);
  if (settings.sound) {
    $('.nav-item').addClass('nav-sound');
    $('#logo').addClass('nav-sound');
  } else if (settings.sound === false) {
    $('.nav-item').removeClass('nav-sound');
    $('#logo').removeClass('nav-sound');
  }
  if (settings.animation) {
    console.warn('turn the automation on');
  } else if (settings.animation === false) {
    console.warn('turn animation off');
  }
  if (settings.chaosMonkey) {
    console.warn('turn the chaos monkey on');
    if ($('#monkey-switch').is(':checked')) {
      console.warn('good its checked');
    }
  } else if (settings.chaosMonkey === false) {
    console.warn('turn the chaos monkey off');
    if ($('#monkey-switch').is(':checked')) {
      console.warn('oops its checked');
    }
  }
};

const updateSettings = (e) => {
  // const value = $(`#${e.target.id}`).checked;
  const value = e.target.checked;
  const { key } = e.target.dataset;
  // console.warn(key, value);
  const settingChange = {
    [key]: value,
  };
  applySettings(settingChange);
  settingsData.updateSettings(settingChange);
};

const settingsMenu = (user) => {
  console.warn('settingsMenu called', user);
  let userId = '';
  if (user) { userId = user.uid; }
  settingsData.getUserSettings(userId)
    .then((response) => {
      if (response) { console.warn('settings', response); }
      const settings = response;
      // console.warn(settings);
      const domString = `  
      <div class="dropdown dropleft mr-4">
        <span class="text-light" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-cog"></i>
        </span>
        <div class="dropdown-menu p-4" id="settings-dropdown" aria-labelledby="dropdownMenuButton">
          <h6 id="user-name">${user ? `<i class="fas fa-user"></i> ${user.displayName}` : ''}</h6>
          <div class="dropdown-divider mb-3"></div>
          <input type="checkbox" id="sound-switch" class="settings-switch" name="sound-switch" data-key="sound" value="sound"${settings.sound ? ' checked' : ''}>
          <label for="sound-switch">Sound</label><br>
          <input type="checkbox" id="animation-switch" class="settings-switch" name="animation-switch" data-key="animation" value="animation"${settings.animation ? ' checked' : ''}>
          <label for="animation-switch">Animation</label><br>
          <input type="checkbox" id="monkey-switch" class="settings-switch" name="monkey-switch" data-key="chaosMonkey" value="chaosMonkey"${settings.chaosMonkey ? ' checked' : ''}>
          <label for="monkey-switch">Chaos Monkey</label><br>
          <div class="dropdown-divider"></div>
          <div class=" logButton" href="#">
          ${user ? '<span id="logoutButton" class="dropdown-item w-100">Log Out</span>' : '<span id="google-auth" class="dropdown-item w-100">Log in</span>'}
          </div>
        </div>
      </div>`;
      utils.printToDom('#settings', domString);
      applySettings(settings);
      return settings;
    })
    .catch((err) => console.error(err));
};

// const settingsMenu = (user) => {
//   console.warn('user sent to getUserSettings', user);
//   let userId = '';
//   if (user) { userId = user.uid; }
//   settingsData.getUserSettings(userId)
//     .then((response) => {
//       if (response) { console.warn('settings', response); }
//       const settings = response;
//       // console.warn(settings);
//       const domString = `
//       <div class="dropdown dropleft mr-4">
//         <span class="text-light" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           <i class="fas fa-cog"></i>
//         </span>
//         <div class="dropdown-menu p-4" id="settings-dropdown" aria-labelledby="dropdownMenuButton">
//           <h6 id="user-name">${user ? `<i class="fas fa-user"></i> ${user.displayName}` : ''}</h6>
//           <div class="dropdown-divider mb-3"></div>
//           <input type="checkbox" id="sound-switch" class="settings-switch" name="sound-switch" data-key="sound" value="sound"${settings.sound ? ' checked' : ''}>
//           <label for="sound-switch">Sound</label><br>
//           <input type="checkbox" id="animation-switch" class="settings-switch" name="animation-switch" data-key="animation" value="animation"${settings.animation ? ' checked' : ''}>
//           <label for="animation-switch">Animation</label><br>
//           <input type="checkbox" id="monkey-switch" class="settings-switch" name="monkey-switch" data-key="chaosMonkey" value="chaosMonkey"${settings.chaosMonkey ? ' checked' : ''}>
//           <label for="monkey-switch">Chaos Monkey</label><br>
//           <div class="dropdown-divider"></div>
//           <div class=" logButton" href="#">
//           ${user ? '<span id="logoutButton" class="dropdown-item w-100">Log Out</span>' : '<span id="google-auth" class="dropdown-item w-100">Log in</span>'}
//           </div>
//         </div>
//       </div>`;
//       utils.printToDom('#settings', domString);
//       applySettings(settings);
//       return settings;
//     })
//     .catch((err) => console.error(err));
// };

export default { settingsMenu, updateSettings };
