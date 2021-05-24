import React from 'react';
import {AppBar, Toolbar, Typography,Button} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';


function Header() {

  return (
    <div>
      <AppBar position="static"
        >
        <Toolbar style={{display:"flex", justifyContent: "space-between"}}>
        <Typography variant="h2">
            BikeLive
        </Typography>
        <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<LockOpenIcon />}
      >
        Login
      </Button>
        </Toolbar>
      </AppBar>
    </div>  
  );
}

export default Header;