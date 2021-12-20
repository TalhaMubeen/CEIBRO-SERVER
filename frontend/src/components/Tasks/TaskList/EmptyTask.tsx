import React from 'react'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';

const EmptyTask = () => {
    
    const classes = useStyles()
    
    return (
        <Grid item xs={12} className={classes.container}>
            <Typography className={classes.text}>
                Not any task was created in project by you or you’re not participating yet
            </Typography>
            <Button variant="contained" color="primary" size="small">Create new</Button>
        </Grid>
    )
}
export default EmptyTask;

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300
    },
    text: {
        marginBottom: 20
    }
})