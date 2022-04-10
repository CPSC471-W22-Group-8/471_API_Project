import React from "react";

const ViewTable2 = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.entryId}</td>
      <td>{contact.location}</td>
      <td>{contact.date}</td>
      <td>{contact.public}</td>
      <td>{contact.insectCaught}</td>
      <td>{contact.fly}</td>
      <td>{contact.flyUsed}</td>
      <td>{contact.success}</td>
      <td>{contact.fishCaught}</td>
      <td>{contact.fishSize}</td>
      <td>{contact.fishWeight}</td>
      <td>{contact.picture}</td>
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

export default ViewTable2;