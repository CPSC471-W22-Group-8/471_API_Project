import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@material-ui/core";




function MainPage() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
            let path = '/user/login';
            navigate(path); 
    }

  return (
    <Box align = 'center' pt={30} >
        <h1>Main Page</h1>
        <h2>Choose how to log in</h2>
        <Button
        color='primary'
        size='large'
        type='submit'
        variant='contained'
        onClick={routeChange}
        >
        Admin Login
    </Button >
        <Button
        color='secondary'
        size='large'
        type='submit'
        variant='contained'
        onClick={routeChange}
        >
        User Login
        </Button>
    </Box>
  );
}



export default MainPage;
