import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import ProjectOverview from './ProjectOverview/ProjectOverview'
import ProjectRoles from './ProjectRoles/ProjectRoles'
import ProjectGroups from './ProjectGroups/ProjectGroups'
import ProjectDocuments from './ProjectDocuments/ProjectDocuments'

const CreateProjectBody = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.body}>
            {/* <ProjectOverview/> */}
            {/* <ProjectRoles/> */}
            {/* <ProjectGroups/> */}
            <ProjectDocuments/>
        </Grid>
    )
}

export default CreateProjectBody


const useStyles = makeStyles({
    body: {
        padding: 20
    }
})
