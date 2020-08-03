import utils from '../../helpers/utils';
import settingsData from '../../helpers/data/settingsData';
import './settings.scss';

const applySettings = (settings) => {
  console.warn('calling settings', settings);
  if (settings.sound) {
    $('.nav-item').addClass('nav-sound');
  } else $('.nav-item').removeClass('hide-assigned');
};

const settingsMenu = (user) => {
  settingsData.getUserSettings(user.uid)
    .then((response) => {
      if (response) { console.warn('settings'); }
      const settings = response;
      // console.warn(settings);
      const domString = `  
      <div class="dropdown dropleft mr-4">
        <span class="text-light" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-cog"></i>
        </span>
        <div class="dropdown-menu p-4" id="settings-dropdown" aria-labelledby="dropdownMenuButton">
          <h6><i class="fas fa-user"></i> ${user.displayName}</h6>
          <div class="dropdown-divider mb-3"></div>
          <input type="checkbox" id="sound-switch" name="sound-switch" value="sound"${settings.sound ? ' checked' : ''}>
          <label for="sound-switch">Sound</label><br>
          <input type="checkbox" id="animation-switch" name="animation-switch" value="animation"${settings.animation ? ' checked' : ''}>
          <label for="animation-switch">Animation</label><br>
          <input type="checkbox" id="monkey-switch" name="monkey-switch" value="chaosMonkey"${settings.chaosMonkey ? ' checked' : ''}>
          <label for="monkey-switch">Chaos Monkey</label><br>
          <div class="dropdown-divider"></div>
          <span class="dropdown-item" href="#">Log Out</span>
        </div>
      </div>`;
      utils.printToDom('#settings', domString);
      applySettings(settings);
    })
    .catch((err) => console.error(err));
};

export default { settingsMenu };
