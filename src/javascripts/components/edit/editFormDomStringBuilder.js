const editEquipDomStringBuilder = (collectionId, equipObj) => {
  let domString = `            
        <form class="edit-equip m-5 editForm" id=${collectionId}>
        <h2>Edit Equipment</h2>
        <div class="form-group">
            <label for="edit-equip-name">Name:</label>
            <input type="text" class="form-control" id="edit-equip-name" placeholder="Cordyceps" value=${equipObj.equipName}>
        </div>
        <div class="form-group">
            <label for="edit-equip-type">Type:</label>
            <input type="text" class="form-control" id="edit-equip-type" placeholder="M" value=${equipObj.equipType}>
        </div>
        <div class="form-group">
            <label for="edit-equip-location">Location:</label>
            <input type="text" class="form-control" id="edit-equip-location" placeholder="Farm" value=${equipObj.equipLocation}>
        </div>
        <div class="form-group">
            <label for="edit-equip-imgUrl">Image URL</label>
            <input type="text" class="form-control" id="edit-equip-imgUrl" placeholder="Image URL" value=${equipObj.equipImgUrl}>
        </div>
        <div class="form-group">
        <div class="form-check">
            `;
  if (equipObj.equipOperational) {
    domString += '<input class="form-check-input" id="edit-equip-operational" type="checkbox" checked>';
  } else {
    domString += '<input class="form-check-input" id="edit-equip-operational" type="checkbox">';
  }
  domString += `
        <label class="form-check-label" for="edit-equip-operational">Is Operational</label>              
        </div>
        </div>
        <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
        <button class="btn btn-warning backButton" id="equip-editor-cancel">Cancel</button>
        </form>
    `;
  return domString;
};

const editVendorDomStringBuilder = (collectionId, vendorObj) => {
  const domString = `            
        <form class="edit-vendor m-5 editForm" id=${collectionId}>
        <h2>Edit Vendor</h2>
        <div class="form-group">
            <label for="edit-vendor-name">Name:</label>
            <input type="text" class="form-control" id="edit-vendor-name" placeholder="Vendor Name e.x. Candy Apple" value=${vendorObj.vendorName}>
        </div>
        <div class="form-group">
            <label for="edit-vendor-type">Type:</label>
            <input type="text" class="form-control" id="edit-vendor-type" placeholder="e.x. resturant" value=${vendorObj.vendorType}>
        </div>
        <div class="form-group">
            <label for="edit-vendor-imgUrl">Image URL</label>
            <input type="text" class="form-control" id="edit-vendor-imgUrl" placeholder="Image URL" value=${vendorObj.vendorImgUrl}>
        </div>
        <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
        <button class="btn btn-warning backButton" id="vendor-editor-cancel">Cancel</button>
        </form>
    `;
  return domString;
};

const editStaffDomStringBuilder = (collectionId, staffObj) => {
  let domString = `
        <form class="edit-staff m-5 editForm" id=${collectionId}>
          <h2>Edit Staff</h2>
          <div class="form-group">
              <label for="edit-staff-name">Name:</label>
              <input type="text" class="form-control" id="edit-staff-name" placeholder="e.g. first last" value=${staffObj.staffName}>
          </div>
          <div class="form-group">
              <label for="edit-staff-title">Title:</label>
              <input type="text" class="form-control" id="edit-staff-title" placeholder="e.g. Engineer" value=${staffObj.staffTitle}>
          </div>
          <div class="form-group">
              <label for="edit-staff-imgUrl">Image URL</label>
              <input type="text" class="form-control" id="edit-staff-imgUrl" placeholder="Image URL" value=${staffObj.staffImgUrl}>
          </div>
          <div class="form-group">
          <div class="form-check">
        `;
  const isTrueSet = (staffObj.kidnap === 'true');
  if (isTrueSet) {
    domString += '<input class="form-check-input" id="edit-staff-kidnapped" type="checkbox" checked>';
  } else {
    domString += '<input class="form-check-input" id="edit-staff-kidnapped" type="checkbox">';
  }
  domString += `
        <label class="form-check-label" for="edit-staff-kidnapped">Is Kidnapped</label>              
      </div>
      </div>
      <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
      <button class="btn btn-warning backButton" id="staff-editor-cancel">Cancel</button>
    </form>
  `;
  return domString;
};

export default {
  editEquipDomStringBuilder,
  editVendorDomStringBuilder,
  editStaffDomStringBuilder,
};
