import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    }
});

function NavBar(props) {
    const { classes } = props;
    
    return(
        <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
                <Typography variant="title" color="inherit">
                    UOSS Equip
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(NavBar);