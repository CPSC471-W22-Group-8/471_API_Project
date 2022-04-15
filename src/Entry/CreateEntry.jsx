import React, { useState } from "react";
import { nanoid } from "nanoid";

import data from "./sample-table-data.json";


const CreateEntry = () => {
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


  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
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

    //const newContacts = [...contacts, newContact];
    //setContacts(newContacts);
    create(newContact);

  };

  const create = (query) => {
    const requestOptions = {
        method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
    }
    fetch('localhost:5000/entry', requestOptions)    //or ?s={query}
    .then(response => response.json())
    alert('Entry successfully created!')
    const form = document.getElementById('create');
    form.reset();
  };

  return (
    <div className="table-container">
    <h2>Add Entry</h2>
    
    <form id="create" onSubmit={handleAddFormSubmit}>        
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
        name="public"
        required="true"
        placeholder="Public or private"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="insectCaught"
        placeholder="Enter insect caught"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="fly"
        placeholder="Enter fly look-alike"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="flyUsed"
        placeholder="Enter fly used"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="success"
        placeholder="Enter success"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="fishCaught"
        placeholder="Enter fish caught"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="fishSize"
        placeholder="Enter fish size"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="fishWeight"
        placeholder="Enter fish weight"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="temperature"
        placeholder="Enter temperature"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="wind"
        placeholder="Enter wind"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="sky"
        placeholder="Enter sky"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="waterFlow"
        placeholder="Enter water flow"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="waterVisibility"
        placeholder="Enter water visibility"
        onChange={handleAddFormChange}
      />
      <input
        type="url"
        name="picture"
        placeholder="Enter picture"
        onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>
      
      
      
    </div>

  );
};

export default CreateEntry;