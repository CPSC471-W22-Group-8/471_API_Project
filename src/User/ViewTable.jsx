import React from "react";

const ViewTable = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fishType}</td>
      <td>{contact.fishSize}</td>
      <td>{contact.weight}</td>
      <td>{contact.flyType}</td>
      
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