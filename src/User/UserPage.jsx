import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup } from "@material-ui/core";

function UserPage() {
    let navigate = useNavigate(); 
    const goToEntry = () => { 
            let path = '/entry';
            navigate(path); 
        }   
    const goToSearch = () => { 
        let path = '/search/entry';
        navigate(path); 
    }   
    const goToGroups = () => { 
        let path = '/group';
        navigate(path); 
    }   
    const goToLocation = () => { 
        let path = '/search/locationprofile';
        navigate(path); 
    }     
    return ( 
    <Box align = 'center' pt={30} >
        <h1>User Page</h1>

        <ButtonGroup variant="contained" size="large" type = 'submit'>
            <Button onClick={goToEntry}>Create Entry</Button>
            <Button onClick={goToSearch}>Search/Edit Entries</Button>
        </ButtonGroup>
        <h1></h1>
        <ButtonGroup variant="contained" size="large" type = 'submit'>
            <Button>Create Group</Button>
            <Button onClick={goToGroups}>View My Groups</Button>
        </ButtonGroup>

        <h1></h1>
        <ButtonGroup variant="contained" size="large" type = 'submit'>
        <Button onClick={goToLocation}>Search Location Profiles</Button>
        </ButtonGroup>

        <h1></h1>
        <ButtonGroup variant="contained" size="large" type = 'submit'>
        <Button >Get Statistics</Button>
        </ButtonGroup>
    </Box>

// go to '/user/entry'
// go to '/user/group/'
// go to /locationprofile/


    
  );
}





export default UserPage;