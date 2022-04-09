import React from "react";
import { Box, Button, ButtonGroup } from "@material-ui/core";

function UserPage() {
  return (
    <Box align = 'center' pt={30} >
        <h1>User Page</h1>

        <ButtonGroup variant="contained" size="large" type = 'submit'>
            <Button>Create Entry</Button>
            <Button>Update Entry</Button>
        </ButtonGroup>
        <h1></h1>
        <ButtonGroup variant="contained" size="large" type = 'submit'>
            <Button>Create Group</Button>
            <Button>View My Groups</Button>
        </ButtonGroup>

        <h1></h1>
        <ButtonGroup variant="contained" size="large" type = 'submit'>
            <Button> Group</Button>
            <Button>View My Groups</Button>
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




export default UserPage;