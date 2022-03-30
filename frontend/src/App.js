import React from 'react';
import './App.css';
//import { observer } from 'mobx-react';  // mobx-react not working
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';

class App extends React.Component {
  
  // defining methods for API
  async componentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }

      });

      let result = await res.json();

      // if log in success
      if (result && result.success) {
        UserStore.loading = false;      // data has been retrieved, doesn't have to load anymore
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      // if login fails
      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }

    }
    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }


  // defining methods for API
  async doLogout() {
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

      });

      let result = await res.json();

      // if logout success
      if (result && result.success) {
        UserStore.isLoggedIn = false;  
        UserStore.username = '';      // empty the username
      }


    }

    //  if logout fails
    catch(e) {
      console.log(e)   // displays error to console
    }
  }


  render() {
    if (UserStore.loading) {
      return (
        <div className='app'>
          <div className='container'> 
            Loading ...       
          </div>
        </div>
      );
    }

    else {
      if (UserStore.isLoggedIn) {
        return (
          <div className='app'>
            <div className='container'> 
              Welcome {UserStore.username}     

              <SubmitButton
                text = {'Log Out'}
                disabled = {false}
                onClick = { () => this.doLogout}     // calls doLogout if logout button clicked
              /> 

            </div>
          </div>
        );
      }

      return (
        <div className="app">
          <div className='container'>
              <SubmitButton                         // logout button
                text = {'Log Out'}
                disabled = {false}
                onClick = { () => this.doLogout}     // calls doLogout if logout button clicked
              /> 
            <LoginForm />
          </div>
        </div>
      );

    }
    
  }
}

export default App;   // observer component listens for changes and updates
