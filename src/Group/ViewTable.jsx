import React from "react";

const ViewTable = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.groupName}</td>
      <td>{contact.groupOwner}</td>
      <td>{contact.user}</td>
      
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Remove user
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete Group
        </button>
      </td>
    </tr>
  );
};

export default ViewTable;