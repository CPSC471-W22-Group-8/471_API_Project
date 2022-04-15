import React from "react";
import { Box, Button } from "@material-ui/core";




function MainPage() {
  return (
    <Box align = 'center' pt={30} >
        <h1>Main Page</h1>
        <h2>Choose how to log in</h2>
        <Button
        color='primary'
        size='large'
        type='submit'
        variant='contained'
        >
        Admin Login
    </Button>
        <Button
        color='secondary'
        size='large'
        type='submit'
        variant='contained'
        >
        User Login
        </Button>
    </Box>
  );
}



export default MainPage;
