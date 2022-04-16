import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import data from "./sample-table-data.json";


const CreateEntry = () => {
  let navigate = useNavigate();
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    entry_Id: "",
    location: "",
    date: "",
    public_flag: "",
    insect_type: "",
    fly: "",
    fly_type: "",
    success: "",
    fish_type: "",
    fish_size: "",
    weight: "",
    water_visibility: "",
    water_flow: "",
    wind: "",
    sky: "",
    temperature: ""
    //picture: ""

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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "requestor_id": "tMYWeQDP-",
    "location": addFormData.location,
    "private_flag": 0,
    "public_flag": 1,
    "date": addFormData.date,
    //"insect_type": addFormData.insect_type,
    //"fly": addFormData.fly,
    //"fly_type": addFormData.fly_type,
    //"success": addFormData.success,
    //"fish_type": addFormData.fish_type,
    //"fish_size": addFormData.fish_size,
    //"fish_weight": addFormData.fish_weight,
    //"water_flow": addFormData.water_flow,
    //"water_visibility": addFormData.water_visibility,
    //"wind": addFormData.wind,
    //"sky": addFormData.sky,
    //"temperature": addFormData.temperature
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:5000/entry", requestOptions)
    .then(function(response){
        if (response.ok){
            alert('Entry Created!')
            navigate('/user/userpage')
        }
        else{
            alert('Entry not created!')
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
    /*event.preventDefault();

    const newContact = {
      id: nanoid(),
      location: addFormData.location,
      date: addFormData.date,
      public_flag: addFormData.public_flag,
      insect_type: addFormData.insect_type,
      fly: addFormData.fly,
      fly_type: addFormData.fly_type,
      success: addFormData.success,
      fish_type: addFormData.fish_type,
      fish_size: addFormData.fish_size,
      fish_weight: addFormData.fish_weight,
      water_flow: addFormData.water_flow,
      water_visibility: addFormData.water_visibility,
      wind: addFormData.wind,
      sky: addFormData.sky,
      temperature: addFormData.temperature,
      //picture: addFormData.picture
      
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
    form.reset();*/
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
        name="public_flag"
        required="true"
        placeholder="Public or private"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="insect_type"
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
        name="fly_type"
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
        name="fish_type"
        placeholder="Enter fish caught"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="fish_size"
        placeholder="Enter fish size"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="fish_weight"
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
        name="water_flow"
        placeholder="Enter water flow"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="water_visibility"
        placeholder="Enter water visibility"
        onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>
      
      
      
    </div>

  );
};

export default CreateEntry;