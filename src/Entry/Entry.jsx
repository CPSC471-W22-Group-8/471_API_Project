import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";

import test from "./test.json";
import data from "./sample-table-data.json";
import ViewTable from "./ViewTable";
import EditTable from "./EditTable";
import EditTable2 from "./EditTable2";
import ViewTable2 from "./ViewTable2";

const Entry = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    admin_id: "",
    entry_id: "",
    location: "",
    date: "",
    public_flag: "",
    private_flag: "",
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

  const [editFormData, setEditFormData] = useState({
    entry_id: "",
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

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "requestor_id": "tMYWeQDP-",
    "location": addFormData.location,
    //"private_flag": 0,
    //"public_flag": 1,
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

    fetch("http://localhost:5000/entry/search", requestOptions)
    .then(function(response){
        if (response.ok){
            //setContacts(test)
            setContacts(response.json())
        }
        else{
            alert('Search unsuccessfull!')
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  
      
    };
  


    /* axios version from postman******************************
    var axios = require('axios');
    var data = JSON.stringify({
    "requestor_id": "tMYWeQDP-",
    "date": "1649950868",
    "location": "Bow River"
    });

    var config = {
    method: 'get',
    url: 'http://localhost:5000/entry/search',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    setContacts(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });***********************************************************/
    
    
    /* fetch version from postman**********************************
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "requestor_id": "tMYWeQDP-",
        "date": "1649950868",
        "location": "Bow River"
      });

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("localhost:5000/entry/search", requestOptions)
        .then(response => response.text())
        .then(result => setContacts(result))
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  
      *************************************************************/
    //setContacts(test);
    


  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      location: editFormData.location,
      date: editFormData.date,
      public_flag: editFormData.public_flag,
      insect_type: editFormData.insect_type,
      fly: editFormData.fly,
      fly_type: editFormData.fly_type,
      success: editFormData.success,
      fish_type: editFormData.fish_type,
      fish_size: editFormData.fish_size,
      weight: editFormData.weight,
      water_flow: editFormData.water_flow,
      water_visibility: editFormData.water_visibility,
      wind: editFormData.wind,
      sky: editFormData.sky,
      temperature: editFormData.temperature
      //picture: editFormData.picture,
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
    public_flag: contact.public_flag,
    insect_type: contact.insect_type,
    fly: contact.fly,
    fly_type: contact.fly_type,
    success: contact.success,
    fish_type: contact.flishCaught,
    fish_size: contact.fish_size,
    weight: contact.weight,
    water_flow: contact.water_flow,
    water_visibility: contact.water_visibility,
    wind: contact.wind,
    sky: contact.sky,
    temperature: contact.temperature
    //picture: contact.picture
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
    
      <form id="search" onSubmit={handleSearchFormSubmit}>        
      <input
          type="text"
          name="location"
          placeholder="Enter location"
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Enter date"
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

        <button type="submit">Search</button>
      </form>
    </div>
    
  );
};

export default Entry;