import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";

import data from "./sample-table-data.json";
import ViewTable2 from "./ViewTable2";

const SearchLocationProfile = () => {
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

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  return (
    <div className="table-container">
      <h1>Location Profiles</h1>
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
                  <ViewTable2
                    contact={contact}
                  />
              </Fragment>
            ))}
          </tbody>
        </table>
      <h2>Search Location Profiles</h2>
        <input
          type="text"
          name="locationName"
          required="true"
          placeholder="Enter Location"
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
        <button type="submit">Search</button>
    </div>
  );
};

export default SearchLocationProfile;