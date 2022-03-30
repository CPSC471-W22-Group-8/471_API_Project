import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./Table.css";
import data from "./sample-table-data.json";
import ViewTable from "./ViewTable";
import EditTable from "./EditTable";

const Table = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    entryId: "",
    personName: "",
    location: "",
    date: "",
  });

  const [editFormData, setEditFormData] = useState({
    entryId: "",
    personName: "",
    location: "",
    date: "",
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
      entryId: addFormData.entryId,
      personName: addFormData.personName,
      location: addFormData.location,
      date: addFormData.date,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      entryId: editFormData.entryId,
      personName: editFormData.personName,
      location: editFormData.location,
      date: editFormData.date,
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
      entryId: contact.entryId,
      personName: contact.personName,
      location: contact.location,
      date: contact.date,
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
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Entry ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>  
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

      <h2>Add a Contact</h2>
    
      <form onSubmit={handleAddFormSubmit}>         
        <input                                      // all inputs must be required?
          type="text"
          name="entryId"

          placeholder="Enter entry ID"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="personName"
          
          placeholder="Enter name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="location"
          
          placeholder="Enter location"
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="date"
          required="required"
          placeholder="date"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Table;