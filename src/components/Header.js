import React from 'react'
import {AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles, Typography} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import Button from "./controls/Button";


const useStyles = theme => ({
    root: {
        backgroundColor: '#fff',

    }
});

export default function Header({user}) {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container>
                    <Grid item sm></Grid>
                    <Grid item sm><Typography variant='h4' sx={{textAlign: 'center'}}>Stack Overflow++</Typography></Grid>
                    <Grid item sm sx={{display: "flex", justifyContent: "flex-end"}}>
                        {user && (
                            <Button sx={{borderRadius: '50%'}} color='secondary' text={user.first_name.charAt(0)+user.last_name.charAt(0)}/>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
