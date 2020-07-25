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

export default {
  editVendorDomStringBuilder,
};
