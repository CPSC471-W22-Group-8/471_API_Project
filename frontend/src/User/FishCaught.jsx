import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";

import data from "./sample-table-data.json";
import ViewTable from "./ViewTable";
import EditTable from "./EditTable";

const requestEntry = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "requestor_id": "tMYWeQDP-"
  });

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  var result = await fetch("localhost:5000/entry/5Ox7OjhHJ", requestOptions)
    .then(response => response.text())
    .then((result) => {console.log(result); return result})
    .catch(error => console.log('error', error));
  return result
}

const requestEntry2 = async () => {
  var res;
  var data = JSON.stringify({
    "requestor_id": "tMYWeQDP-"
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log('res text = ' + this.responseText);
      res = this.responseText;
    }
  });

  xhr.open("GET", "localhost:5000/entry/5Ox7OjhHJ");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
  return res;
}

const FishCaught = async () => {
  //var data = requestEntry2();
  const [contacts, setContacts] = useState(null);
  //console.log(data);
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  // var raw = JSON.stringify({
  //   "requestor_id": "tMYWeQDP-"
  // });

  // var requestOptions = {
  //   method: 'GET',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };

  // useEffect(() => {
  //   fetch("localhost:5000/entry/5Ox7OjhHJ", requestOptions)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setItems(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])

  const [addFormData, setAddFormData] = useState({
    entry_id: "",
    fish_type: "",
    fish_size: "",
    weight: "",
    fly_type: "",
    success: ""
    // date: "",
    // something: ""
  });

  const [editFormData, setEditFormData] = useState({
    entryId: "",
    fishType: "",
    fishSize: "",
    weight: "",
    flyType: "",
    success: ""
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
      fishType: addFormData.fishType,
      fishSize: addFormData.fishSize,
      weight: addFormData.weight,
      flyType: addFormData.flyType,
      success: addFormData.success
    //   date: addFormData.date,
    //   something: addFormData.something,
      
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fishType: editFormData.fishType,
      fishSize: editFormData.fishSize,
      weight: editFormData.weight,
      flyType: editFormData.flyType,
      success: editFormData.success
    //   date: editFormData.date,
    //   something: addFormData.something,
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
      fishType: contact.fishType,
      fishSize: contact.fishSize,
      weight: contact.weight,
      flyType: contact.flyType,
      success: contact.success
    //   date: contact.date,
    //   something: contact.something,
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
      <h1>Fish Caught</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Fish Type</th>
              <th>Fish Size</th>
              <th>Weight</th>  
              <th>Fly Type</th>
              <th>Success</th>
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
          name="fishType"
          required="true"
          placeholder="Enter fish type"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="fishSize"
          required="true"
          placeholder="Enter fish size"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="weight"
          required="true"
          placeholder="Enter fish weight"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="flyType"
          required="true"
          placeholder="Enter fly type"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="success"
          required="true"
          placeholder="Enter success"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default FishCaught;