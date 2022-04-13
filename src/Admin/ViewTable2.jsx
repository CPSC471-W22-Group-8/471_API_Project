import React from "react";

const ViewTable = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.adminID}</td>
      <td>{contact.locationName}</td>
      <td>{contact.regulations}</td>
      <td>{contact.fishTypes}</td>
      <td>{contact.insectHatches}</td>
      <td>{contact.dates}</td>
    </tr>
  );
};

export default ViewTable;