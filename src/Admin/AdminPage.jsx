import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup } from "@material-ui/core";

function AdminPage() {
    let navigate = useNavigate(); 
    const goToEntry = () => { 
            let path = '/search/entry';
            navigate(path); 
        } 
        const goToCreate = () => { 
            let path = '/locationprofile';
            navigate(path); 
        } 
        const goToSearch = () => { 
            let path = '/search/locationprofile';
            navigate(path); 
        } 
  
    return (
    <Box align = 'center' pt={30} >
        <h1>Admin Page</h1>

        <ButtonGroup variant="contained" size="large" type = 'submit'>
            <Button onClick={goToEntry}>Search Entries</Button>
        </ButtonGroup>

        <h1></h1>
        <ButtonGroup variant="contained" size="large" type = 'submit'>
            <Button onClick={goToCreate}>Create Location Profile</Button>
            <Button onClick={goToSearch}>Search/Edit Location Profiles</Button>
            
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