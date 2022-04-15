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
    something: ""
  });

  const [editFormData, setEditFormData] = useState({
    entryId: "",
    personName: "",
    location: "",
    date: "",
    something: ""
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
      something: addFormData.something,
      
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
      something: addFormData.something,
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
      something: contact.something,
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
              <th>Name</th>
              <th>Admin ID</th>
              <th>Regulations</th>  
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

      <h2>Add a entry</h2>
    
      <form onSubmit={handleAddFormSubmit}>         
        <input                                      // all inputs must be required
          type="text"
          name="entryId"
          required="true"
          placeholder="Enter fish size"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="personName"
          required="true"
          placeholder="Enter fish type"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="location"
          required="true"
          placeholder="Enter weight"
          onChange={handleAddFormChange}
        />
        {/* <input
          type="date"
          name="date"
          required="true"
          placeholder="date"
          onChange={handleAddFormChange}
        /> */}
        {/* <input
          type="text"
          name="something"
          required="true"
          placeholder="Enter fly type"
          onChange={handleAddFormChange}
        /> */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Table;