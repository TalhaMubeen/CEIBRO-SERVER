import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import ProjectOverview from './ProjectOverview/ProjectOverview'

const CreateProjectBody = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.body}>
            <ProjectOverview/>
        </Grid>
    )
}

export default CreateProjectBody


const useStyles = makeStyles({
    body: {
        padding: 20
    },
    datePickerWrapper: {
        paddingLeft: 20
    },
    secondForm: {
        paddingTop: 0
    }
})
