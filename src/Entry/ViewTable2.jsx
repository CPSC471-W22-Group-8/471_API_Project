import React from "react";

const ViewTable2 = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.entry_Id}</td>
      <td>{contact.location}</td>
      <td>{contact.date}</td>
      <td>{contact.public_flag}</td>
      <td>{contact.insect_type}</td>
      <td>{contact.fly}</td>
      <td>{contact.fly_type}</td>
      <td>{contact.success}</td>
      <td>{contact.fish_type}</td>
      <td>{contact.fish_size}</td>
      <td>{contact.weight}</td>
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