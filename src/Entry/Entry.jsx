import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";

import data from "./sample-table-data.json";
import ViewTable from "./ViewTable";
import EditTable from "./EditTable";
import EditTable2 from "./EditTable2";
import ViewTable2 from "./ViewTable2";

const Entry = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    entryId: "",
    location: "",
    date: "",
    public: "",
    insectCaught: "",
    fly: "",
    flyUsed: "",
    success: "",
    fishCaught: "",
    fishSize: "",
    fishWeight: "",
    waterVisibility: "",
    waterFlow: "",
    wind: "",
    sky: "",
    temperature: "",
    picture: ""

  });

  const [editFormData, setEditFormData] = useState({
    entryId: "",
    location: "",
    date: "",
    public: "",
    insectCaught: "",
    fly: "",
    flyUsed: "",
    success: "",
    fishCaught: "",
    fishSize: "",
    fishWeight: "",
    waterVisibility: "",
    waterFlow: "",
    wind: "",
    sky: "",
    temperature: "",
    picture: ""
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
      location: addFormData.location,
      date: addFormData.date,
      public: addFormData.public,
      insectCaught: addFormData.insectCaught,
      fly: addFormData.fly,
      flyUsed: addFormData.flyUsed,
      success: addFormData.success,
      fishCaught: addFormData.fishCaught,
      fishSize: addFormData.fishSize,
      fishWeight: addFormData.fishWeight,
      waterFlow: addFormData.waterFlow,
      waterVisibility: addFormData.waterVisibility,
      wind: addFormData.wind,
      sky: addFormData.sky,
      temperature: addFormData.temperature,
      picture: addFormData.picture
      
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      location: editFormData.location,
      date: editFormData.date,
      public: editFormData.public,
      insectCaught: editFormData.insectCaught,
      fly: editFormData.fly,
      flyUsed: editFormData.flyUsed,
      success: editFormData.success,
      fishCaught: editFormData.fishCaught,
      fishSize: editFormData.fishSize,
      fishWeight: editFormData.fishWeight,
      waterFlow: editFormData.waterFlow,
      waterVisibility: editFormData.waterVisibility,
      wind: editFormData.wind,
      sky: editFormData.sky,
      temperature: editFormData.temperature,
      picture: editFormData.picture,
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
    location: contact.location,
    date: contact.date,
    public: contact.public,
    insectCaught: contact.insectCaught,
    fly: contact.fly,
    flyUsed: contact.flyUsed,
    success: contact.success,
    fishCaught: contact.flishCaught,
    fishSize: contact.fishSize,
    fishWeight: contact.fishWeight,
    waterFlow: contact.waterFlow,
    waterVisibility: contact.waterVisibility,
    wind: contact.wind,
    sky: contact.sky,
    temperature: contact.temperature,
    picture: contact.picture
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
      <h1>Entry</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Entry ID</th>
              <th>Location</th>
              <th>Date</th>  
              <th>Public/Private</th>
              <th>Insect Caught</th>
              <th>Fly Look-alike</th>
              <th>Fly Used</th>
              <th>Success</th>
              <th>Fish Caught</th>
              <th>Fish Size</th>
              <th>Fish Weight</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditTable2
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ViewTable2
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
      <h1>Conditions</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Temperature</th>
              <th>Wind</th>
              <th>Sky</th>  
              <th>Water Visibility</th>
              <th>Water Flow</th>
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

      <h2>Search Entries</h2>
    
      <form onSubmit={handleAddFormSubmit}>        
      <input
          type="text"
          name="location"
          required="true"
          placeholder="Enter location"
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="date"
          required="true"
          placeholder="Enter date"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="insectCaught"
          required="false"
          placeholder="Enter insect caught"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="flyUsed"
          required="false"
          placeholder="Enter fly used"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="success"
          required="false"
          placeholder="Enter success"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="fishCaught"
          required="false"
          placeholder="Enter fish caught"
          onChange={handleAddFormChange}
        />

        <button type="submit">Search</button>
      </form>
    </div>

  );
};

export default Entry;