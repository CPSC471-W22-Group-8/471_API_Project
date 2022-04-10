import React from "react";

const EditTable2 = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter ID"
          name="entryId"
          value={editFormData.entryId}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter location"
          name="location"
          value={editFormData.location}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="date"
          required="required"
          placeholder="Enter date"
          name="date"
          value={editFormData.date}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Public/Private"
          name="public"
          value={editFormData.public}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter insect caught"
          name="insectCaught"
          value={editFormData.insectCaught}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter fly look-alike"
          name="fly"
          value={editFormData.fly}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter fly used"
          name="flyUsed"
          value={editFormData.flyUsed}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter success"
          name="success"
          value={editFormData.success}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter fish caught"
          name="fishCaught"
          value={editFormData.fishCaught}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter fish size"
          name="fishSize"
          value={editFormData.fishSize}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter fish weight"
          name="fishWeight"
          value={editFormData.fishWeight}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="url"
          required="required"
          placeholder="Enter picture"
          name="picture"
          value={editFormData.picture}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditTable2;