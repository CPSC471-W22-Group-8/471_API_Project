import React from "react";

const ViewTable = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.waterVisibility}</td>
      <td>{contact.wind}</td>
      <td>{contact.sky}</td>
      <td>{contact.temperature}</td>
      
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ViewTable;