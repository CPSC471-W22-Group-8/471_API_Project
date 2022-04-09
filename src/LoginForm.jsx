import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false           // for if user exists in database, then disable login button to avoid dubicate user info
    }
  }

  setInputValue(property, val) {
    val = val.trim();

    if (val.length > 12) {            // username will have max 12 characters 
      return;
    }
    this.setState ({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }

    this.setState ({
      buttonDisabled: true
    })


    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
          username: this.state.username,
          password: this.state.password
        })

      });
      
      // user login form result
      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
      
    
    }

    catch(e) {
      console.log(e);
      this.resetForm();
    }
  }

  render() {
    return (
      <div className="loginForm">
        Login Page
        <InputField                   // username field
            type = 'text'
            placeholder = 'Username'
            value = {this.state.username ? this.state.username : ''}
            onChange = { (val) => this.setInputValue('username', val) }
          />

          <InputField                 // password field
            type = 'password'
            placeholder = 'Password'
            value = {this.state.password ? this.state.password : ''}
            onChange = { (val) => this.setInputValue('password', val) }
          />

          <SubmitButton                 
            text = 'Login'
            disbabled = {this.state.buttonDisabled}
            onClick = { () => this.doLogin() }
          />
      </div>
    );
  }
}

export default LoginForm;