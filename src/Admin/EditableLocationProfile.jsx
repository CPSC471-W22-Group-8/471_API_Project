import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";

import data from "./sample-table-data.json";
import ViewTable from "./ViewTable";
import EditTable from "./EditTable";

const EditableLocationProfile = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    entryId: "",
    locationName: "",
    adminID: "",
    regulations: "",
    fishTypes: "",
    insectHatches: "",
    date: ""
  });

  const [editFormData, setEditFormData] = useState({
    entryId: "",
    locationName: "",
    adminID: "",
    regulations: "",
    fishTypes: "",
    insectHatches: "",
    date: ""
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      locationName: addFormData.locationName,
      adminID: addFormData.adminId,
      regulations: addFormData.regulations,
      fishTypes: addFormData.fishTypes,
      insectHatches: addFormData.insectHatches,
      date: addFormData.date
      
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      locationName: editFormData.locationName,
      adminID: editFormData.adminId,
      regulations: editFormData.regulations,
      fishTypes: editFormData.fishTypes,
      insectHatches: editFormData.insectHatches,
      date: editFormData.date
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      locationName: contact.locationName,
      adminID: contact.adminId,
      regulations: contact.regulations,
      fishTypes: contact.fishTypes,
      insectHatches: contact.insectHatches,
      date: contact.date
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="table-container">
      <h1>Editable Location Profiles</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Admin ID</th>
              <th>Location</th>
              <th>Regulations</th>
              <th>Fish Types</th>
              <th>Insect Hatches</th>
              <th>Dates</th>  
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditTable
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ViewTable
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add Entry</h2>
    
      <form onSubmit={handleAddFormSubmit}>         
        <input                                      // all inputs must be required
          type="text"
          name="adminID"
          required="true"
          placeholder="Enter Admin ID"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="locationName"
          required="true"
          placeholder="Enter Location"
          onChange={handleAddFormChange}
        />
        <input
          type="url"
          name="regulations"
          required="true"
          placeholder="Enter regulations"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="fishTypes"
          required="true"
          placeholder="Enter fish types"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="insectHatches"
          required="true"
          placeholder="Enter insect hatches"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="dates"
          required="true"
          placeholder="Enter date range"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default EditableLocationProfile;