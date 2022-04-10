import React from "react";
import { Box, Button, ButtonGroup } from "@material-ui/core";

function AdminPage() {
  return (
    <Box align = 'center' pt={30} >
        <h1>Admin Page</h1>

        <ButtonGroup variant="contained" size="large" type = 'submit'>
            <Button>Search Entries</Button>
        </ButtonGroup>

        <h1></h1>
        <ButtonGroup variant="contained" size="large" type = 'submit'>
            <Button>Create Location Profile</Button>
            <Button>Search/Edit Location Profiles</Button>
            
        </ButtonGroup>
        
    </Box>



    
  );
}


{/* <Button
            size='large'
            type='submit'
            variant='contained'
            >
            Create Entry
        </Button>
        <Button
            size='large'
            type='submit'
            variant='contained'
            >
            Update Entry
        </Button>

        <Button
            color='suceess'
            size='large'
            type='submit'
            variant='contained'
            >
            View My Groups
        </Button>

        <Button
            color='suceess'
            size='large'
            type='submit'
            variant='contained'
            >
            Create Group
        </Button> */}




export default AdminPage;