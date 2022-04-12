import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@material-ui/core";




function MainPage() {

    let navigate = useNavigate(); 
    const goToUser = () => { 
            let path = '/user/login';
            navigate(path); 
        }    
    const goToAdmin = () =>{
            let path = '/admin/login';
            navigate(path);
        }
    //this.getElementById('sidenav').style.display = "none";

  return (

    <Box align = 'center' pt={30} >
        <h1>Main Page</h1>
        <h2>Choose how to log in</h2>
        <Button
        color='primary'
        size='large'
        type='submit'
        variant='contained'
        onClick={goToAdmin}
        >
        Admin Login
    </Button >
        <Button
        color='secondary'
        size='large'
        type='submit'
        variant='contained'
        onClick={goToUser}
        >
        User Login
        </Button>
        
    </Box>
  );
}



export default MainPage;
